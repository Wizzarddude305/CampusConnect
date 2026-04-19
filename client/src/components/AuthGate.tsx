// Waits for the auth check to finish before rendering anything
import { useAuth } from "./AuthContext.tsx";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  // Don't render until we know if the user is logged in
  if (loading) {
    return null;
  }

  return children;
}
