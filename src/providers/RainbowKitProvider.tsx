import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider as RKProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "../config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export function RainbowKitProvider({ children }: Props) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RKProvider
          initialChain={2484} // U2U Testnet as initial chain
          showRecentTransactions={true}
          theme={darkTheme({
            accentColor: "#3b82f6",
            accentColorForeground: "white",
            borderRadius: "medium",
          })}
          appInfo={{
            appName: "Hulk-Hub",
          }}
          modalSize="compact"
        >
          {children}
        </RKProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
