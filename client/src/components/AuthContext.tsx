// AuthContext.tsx
import { createContext, useState, useContext, type ReactNode } from 'react';


export const AuthContext = createContext<{
  user: { userEmail: string; userName: string; privilege?: string } | null;
  login: (email:string , name:string, privilege?: string) => void;
  logout: () => void;
} | null>(null);



export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{userEmail:string, userName:string, privilege?: string} | null>(null);

  const login = (email:string , name:string, privilege?: string) => {
        setUser({ 
            userEmail: email, 
            userName: name,
            privilege: privilege || 'user'
        });
    };

  const logout = () => {
    setUser(null);
 }


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};