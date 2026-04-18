import { useAuth } from "./AuthContext.tsx";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return null;
  }

  return children;
}
