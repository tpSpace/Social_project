import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Wallet, Network, CheckCircle } from "lucide-react";
import { useAuth } from "../providers/AuthProvider";

const LoginRainbow = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const { isAuthenticated, login, isLoading } = useAuth();
  const hasNavigated = useRef(false);

  // Redirect if already authenticated (only once)
  useEffect(() => {
    if (isAuthenticated && !hasNavigated.current) {
      hasNavigated.current = true;
      console.log("Redirecting to home - user authenticated");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-black p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Sign in to Hulk-Hub</h1>
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

        <div className="space-y-4">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div className="space-y-4">
                  {!connected ? (
                    <button
                      onClick={openConnectModal}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-3 px-4 rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all flex items-center justify-center gap-2"
                    >
                      <Wallet className="w-5 h-5" />
                      Connect Wallet
                    </button>
                  ) : chain?.unsupported ? (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                      <p className="text-red-400 mb-2">Wrong Network</p>
                      <p className="text-sm text-red-300">
                        Please switch to U2U Network Nebulas
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Wallet Info */}
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <p className="text-sm text-gray-400">
                            Wallet Connected
                          </p>
                        </div>
                        <p className="text-white font-mono">
                          {account?.displayName}
                        </p>
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <p className="text-sm text-gray-400 mb-1">Network</p>
                          <p className="text-green-400 text-sm font-medium">
                            {chain?.name}
                          </p>
                        </div>
                      </div>

                      {/* Sign In Button */}
                      <button
                        onClick={login}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Signing in...
                          </>
                        ) : (
                          <>
                            <Wallet className="w-5 h-5" />
                            Sign Message & Enter
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>

          {!isConnected && (
            <div className="text-center text-gray-400 text-sm">
              <p>
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
          )}
        </div>

        <div className="mt-6 text-center text-gray-500">
          Need to create an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRainbow;

