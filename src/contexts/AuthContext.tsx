
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve essere usato all'interno di un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se l'utente è già loggato all'avvio
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRememberMe = localStorage.getItem("rememberMe") === "true";
    
    if (storedUser && storedRememberMe) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean = false) => {
    // Simula una chiamata API
    setIsLoading(true);
    try {
      // In un'app reale, questa sarebbe una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Per demo, accettiamo qualsiasi combinazione con password "password"
      if (password !== "password") {
        throw new Error("Credenziali non valide");
      }
      
      const newUser = {
        id: "user-" + Date.now(),
        name: email.split("@")[0],
        email
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      // Se "ricordami" è selezionato, salviamo questa preferenza
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simula una chiamata API
    setIsLoading(true);
    try {
      // In un'app reale, questa sarebbe una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: "user-" + Date.now(),
        name,
        email
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      // Per default, non attiviamo il "ricordami" durante la registrazione
      localStorage.removeItem("rememberMe");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // In un'app reale, questa sarebbe una chiamata API per inviare email di reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simuliamo il successo per la demo
      return Promise.resolve();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Manteniamo la preferenza "ricordami" anche dopo il logout
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
