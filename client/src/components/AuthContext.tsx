// Stores the logged in user globally
import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';

type User = {
  userEmail: string;
  userName: string;
  privilege?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (token: string, email: string, name: string, privilege?: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  //login persistence on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(data => {
        setUser({
          userEmail: data.email,
          userName: data.name || data.email,
          privilege: data.privilege,
        });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
}, []);

  // Save token and update user state on login
  const login = (token: string, email: string, name: string, privilege?: string) => {
    localStorage.setItem("token", token);

    setUser({
      userEmail: email,
      userName: name,
      privilege: privilege || 'user',
    });
  };

  // Clear token and user state on logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
