import { BrowserProvider } from 'ethers';

export interface WalletInfo {
  address: string;
  chainId: string;
}

export interface NetworkConfig {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

// U2U Network Configurations
export const U2U_MAINNET: NetworkConfig = {
  chainId: '0x27', // 39 in decimal
  chainName: 'U2U Solaris Mainnet',
  nativeCurrency: {
    name: 'U2U',
    symbol: 'U2U',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-mainnet.u2u.xyz'],
  blockExplorerUrls: ['https://u2uscan.xyz'],
};

export const U2U_TESTNET: NetworkConfig = {
  chainId: '0x9b4', // 2484 in decimal
  chainName: 'U2U Network Nebulas',
  nativeCurrency: {
    name: 'U2U',
    symbol: 'U2U',
    decimals: 18,
  },
  rpcUrls: ['https://rpc-nebulas-testnet.u2u.xyz'],
  blockExplorerUrls: ['https://testnet.u2uscan.xyz'],
};

// Default to testnet
export const U2U_NETWORK = U2U_TESTNET;

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const walletService = {
  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled(): boolean {
    return typeof window.ethereum !== 'undefined';
  },

  /**
   * Check if user is on U2U network
   */
  async isOnU2UNetwork(): Promise<boolean> {
    if (!this.isMetaMaskInstalled()) {
      return false;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      return network.chainId.toString() === parseInt(U2U_NETWORK.chainId, 16).toString();
    } catch (error) {
      console.error('Error checking network:', error);
      return false;
    }
  },

  /**
   * Switch to U2U network
   */
  async switchToU2UNetwork(): Promise<void> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed.');
    }

    try {
      // Try to switch to U2U network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: U2U_NETWORK.chainId }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          // Add U2U network to MetaMask
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [U2U_NETWORK],
          });
        } catch (addError) {
          throw new Error('Failed to add U2U network to MetaMask.');
        }
      } else if (switchError.code === 4001) {
        throw new Error('User rejected the network switch request.');
      } else {
        throw switchError;
      }
    }
  },

  /**
   * Connect to MetaMask wallet and ensure U2U network
   */
  async connectWallet(): Promise<WalletInfo> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      // Check if on U2U network, if not, switch to it
      const isOnU2U = await this.isOnU2UNetwork();
      if (!isOnU2U) {
        await this.switchToU2UNetwork();
      }

      // Get network information after potential switch
      const network = await provider.getNetwork();
      
      return {
        address: accounts[0],
        chainId: network.chainId.toString(),
      };
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the connection request.');
      }
      throw error;
    }
  },

  /**
   * Get current connected wallet address
   */
  async getCurrentAccount(): Promise<string | null> {
    if (!this.isMetaMaskInstalled()) {
      return null;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_accounts', []);
      return accounts && accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('Error getting current account:', error);
      return null;
    }
  },

  /**
   * Sign a message with the wallet
   */
  async signMessage(message: string): Promise<string> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed.');
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('User rejected the signature request.');
      }
      throw error;
    }
  },

  /**
   * Listen to account changes
   */
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', callback);
    }
  },

  /**
   * Listen to chain changes
   */
  onChainChanged(callback: (chainId: string) => void): void {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', callback);
    }
  },

  /**
   * Remove event listeners
   */
  removeAllListeners(): void {
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
    }
  },

  /**
   * Disconnect wallet (clear local state)
   */
  disconnectWallet(): void {
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },

  /**
   * Get current network info
   */
  async getCurrentNetwork(): Promise<{ chainId: string; chainName: string } | null> {
    if (!this.isMetaMaskInstalled()) {
      return null;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      return {
        chainId: network.chainId.toString(),
        chainName: network.name,
      };
    } catch (error) {
      console.error('Error getting network:', error);
      return null;
    }
  },
};

