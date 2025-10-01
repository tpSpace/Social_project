import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAccount, useSignMessage } from "wagmi";
import { toast } from "react-hot-toast";

export interface UserProfile {
  address: string;
  role: "USER" | "ADMIN";
  name: string;
  walletAddress: string;
  createdAt: Date;
  lastLogin: Date;
  isVerified: boolean;
  avatarId?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const isAuthenticated =
    !!user && isConnected && user.walletAddress === address;

  // Memoized logout function to prevent re-renders
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("hulkhub_user");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  }, []);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("hulkhub_user");
    const isAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && isAuth === "true") {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Only set user if wallet address matches
        if (parsedUser.walletAddress === address) {
          setUser(parsedUser);
          // Sync with 'user' key for compatibility
          localStorage.setItem("user", JSON.stringify(parsedUser));
        } else {
          // Clear invalid stored data
          localStorage.removeItem("hulkhub_user");
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("hulkhub_user");
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
    }
    setIsLoading(false);
  }, [address]);

  // Clear auth if wallet disconnects or address changes
  useEffect(() => {
    if (!isConnected && user) {
      console.log("Wallet disconnected, logging out");
      logout();
    } else if (isConnected && user && user.walletAddress !== address) {
      console.log("Wallet address changed, logging out");
      logout();
    }
  }, [isConnected, address, user, logout]);

  const login = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsLoading(true);

      // Create message to sign
      const message = `Sign this message to authenticate with Hulk-Hub\n\nWallet: ${address}\nTimestamp: ${Date.now()}`;

      // Request signature
      const signature = await signMessageAsync({ message });

      console.log("Signature:", signature);

      // TODO: Send signature to backend for verification
      // const response = await api.post('/auth/wallet/login', {
      //   walletAddress: address,
      //   signature,
      //   message,
      // });

      // For now, create user profile locally
      const userProfile: UserProfile = {
        address,
        walletAddress: address,
        role: "USER",
        name: `User ${address.slice(0, 6)}...${address.slice(-4)}`,
        createdAt: new Date(),
        lastLogin: new Date(),
        isVerified: true,
      };

      setUser(userProfile);
      localStorage.setItem("hulkhub_user", JSON.stringify(userProfile));
      localStorage.setItem("user", JSON.stringify(userProfile)); // For compatibility with Home page
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("walletAddress", address);

      toast.success("Successfully authenticated!");

      // The LoginRainbow page will handle navigation to home
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.message?.includes("User rejected")) {
        toast.error("Signature rejected");
      } else {
        toast.error("Authentication failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
