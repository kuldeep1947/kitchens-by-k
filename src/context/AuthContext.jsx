import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("kbk_auth");
    return stored ? JSON.parse(stored) : null;
  });

  const [avatar, setAvatar] = useState(() => {
    const user = localStorage.getItem("kbk_user");
    return user ? JSON.parse(user).avatar : null;
  });

  const login = (authData) => {
    localStorage.setItem("kbk_auth", JSON.stringify(authData));
    setAuth(authData);
    const user = localStorage.getItem("kbk_user");
    setAvatar(user ? JSON.parse(user).avatar : null);
  };

  const logout = () => {
    localStorage.removeItem("kbk_auth");
    setAuth(null);
    setAvatar(null);
  };

  const updateAvatar = (newAvatar) => {
    setAvatar(newAvatar);
  };

  return (
    <AuthContext.Provider value={{ auth, avatar, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
