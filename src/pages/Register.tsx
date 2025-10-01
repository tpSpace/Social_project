import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { walletService, U2U_NETWORK } from "../services/wallet.service";
import { toast } from "react-hot-toast";
import { Wallet, UserPlus, Network } from "lucide-react";

const Register = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if wallet is already connected
    checkWalletConnection();
    checkNetwork();

    // Listen for account changes
    walletService.onAccountsChanged((accounts) => {
      if (accounts.length === 0) {
        setWalletAddress(null);
        setShowNameInput(false);
        walletService.disconnectWallet();
      } else {
        setWalletAddress(accounts[0]);
      }
    });

    // Listen for network changes
    walletService.onChainChanged(async (chainId) => {
      const expectedChainId = parseInt(U2U_NETWORK.chainId, 16);
      const currentChainId = parseInt(chainId, 16);

      if (currentChainId !== expectedChainId) {
        toast.error("Please switch to U2U Network");
        setWalletAddress(null);
        setShowNameInput(false);
        walletService.disconnectWallet();
      } else {
        await checkNetwork();
      }
    });

    return () => {
      walletService.removeAllListeners();
    };
  }, []);

  const checkWalletConnection = async () => {
    const account = await walletService.getCurrentAccount();
    if (account) {
      const isOnU2U = await walletService.isOnU2UNetwork();
      if (isOnU2U) {
        setWalletAddress(account);
      }
    }
  };

  const checkNetwork = async () => {
    const network = await walletService.getCurrentNetwork();
    if (network) {
      setCurrentNetwork(network.chainName);
    }
  };

  const walletRegisterMutation = useMutation({
    mutationFn: async (data: { walletAddress: string; name?: string }) => {
      return authService.walletRegister(data);
    },
    onSuccess: (response) => {
      console.log("Wallet registration response:", response);

      if (response.success) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else {
        toast.error("Registration response format error");
      }
    },
    onError: (error: any) => {
      console.error("Wallet registration error:", error);

      // Check if user already exists
      if (
        error.response?.status === 409 ||
        error.response?.data?.message?.includes("already exists")
      ) {
        toast.error("Wallet already registered. Please login instead.");
        navigate("/login");
      } else {
        toast.error(
          error.response?.data?.message || "Wallet registration failed"
        );
      }
    },
  });

  const handleConnectWallet = async () => {
    if (!walletService.isMetaMaskInstalled()) {
      toast.error("Please install MetaMask to continue");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      setIsConnecting(true);
      const walletInfo = await walletService.connectWallet();
      setWalletAddress(walletInfo.address);
      setShowNameInput(true);
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast.error(error.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      toast.error("Please connect your wallet first");
      return;
    }

    walletRegisterMutation.mutate({
      walletAddress,
      name: username.trim() || undefined,
    });
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-black p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-gray-400 mt-2">
            Connect your wallet on U2U Network
          </p>

          {/* Network Badge */}
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2">
            <Network className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">
              U2U Network Nebulas
            </span>
          </div>
        </div>

        {!walletAddress ? (
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-4 rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Connect MetaMask Wallet
              </>
            )}
          </button>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
              <p className="text-white font-mono">
                {formatAddress(walletAddress)}
              </p>
              {currentNetwork && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <p className="text-sm text-gray-400">Network</p>
                  <p className="text-green-400 text-sm font-medium">
                    {currentNetwork}
                  </p>
                </div>
              )}
            </div>

            {showNameInput && (
              <div>
                <input
                  type="text"
                  placeholder="Username (optional)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-sm text-gray-400 mt-2">
                  Leave blank to use your wallet address as username
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={walletRegisterMutation.isPending}
              className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold py-3 px-4 rounded-full hover:from-green-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {walletRegisterMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Don't have MetaMask?{" "}
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Download here
            </a>
          </p>
        </div>

        <div className="mt-6 text-center text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
