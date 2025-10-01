import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useSignMessage } from "wagmi";
import { Network, CheckCircle, AlertCircle } from "lucide-react";
import { defaultChain } from "../config/chains";

interface WalletConnectProps {
  onConnect?: (address: string, chainId: number) => void;
  onSign?: (signature: string, message: string) => void;
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address && onConnect) {
      onConnect(address, chainId);
    }
  }, [isConnected, address, chainId, onConnect]);

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-700 rounded-lg animate-pulse" />
        <div className="text-center text-gray-400 text-sm">
          Loading wallet...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted: buttonMounted,
        }) => {
          const ready = buttonMounted;
          const connected = ready && account && chain;

          return (
            <div>
              {!connected ? (
                <button
                  onClick={openConnectModal}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  Connect Wallet
                </button>
              ) : chain.unsupported ? (
                <div className="space-y-3">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-400 mb-2">
                      <AlertCircle className="w-5 h-5" />
                      <span className="font-semibold">Wrong Network</span>
                    </div>
                    <p className="text-sm text-red-300 mb-3">
                      Please switch to U2U Network
                    </p>
                    <button
                      onClick={openChainModal}
                      className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-red-600 transition-colors"
                    >
                      Switch Network
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-gray-400">Connected Wallet</p>
                      <button
                        onClick={openAccountModal}
                        className="text-blue-400 text-sm hover:underline"
                      >
                        Change
                      </button>
                    </div>
                    <p className="text-white font-mono mb-3">
                      {account.displayName}
                    </p>

                    <div className="pt-3 border-t border-gray-700 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Network</p>
                        <div className="flex items-center gap-2">
                          {chain.id === defaultChain.id ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Network className="w-4 h-4 text-yellow-400" />
                          )}
                          <span className="text-sm text-green-400 font-medium">
                            {chain.name}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={openChainModal}
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        Switch
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>

      {isConnected && !mounted && (
        <div className="text-center text-gray-400 text-sm">
          <AlertCircle className="w-4 h-4 mx-auto mb-2" />
          Connect your wallet to continue
        </div>
      )}
    </div>
  );
}

// Export sign helper
export { useSignMessage };
