import { IUser } from "@/types/user.type";
import React, { createContext, useEffect, useState } from "react";

interface AuthContextProps {
  user: IUser | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [init, setInit] = useState(true);

  const pathname = window.location.pathname;

  const getProfile = async () => {
    try {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setInit(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token && typeof token === "string") {
      setToken(token);
    }
    setInit(true);
    getProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser }}>
      {init ? (
        <div className=" h-screen w-full justify-center items-center">
          Loading ...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
