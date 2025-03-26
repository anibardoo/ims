import { useContext } from "react";
import AuthContext from "./AuthContext";

// Custom Hook for easier access
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
