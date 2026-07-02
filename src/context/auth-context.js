import { createContext, useContext } from "react";

// Context object + hook live here, separate from the provider component, so the
// provider file (AuthContext.jsx) exports only a component — which keeps React
// Fast Refresh working cleanly (react-refresh/only-export-components).
export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}
