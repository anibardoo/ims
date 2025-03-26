import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // User State
  
    // Login Function with User Data
    const login = (userData) => {
      setIsAuthenticated(true);
      setUser(userData); // Store User Data
    };
  
    // Logout Function
    const logout = () => {
      setIsAuthenticated(false);
      setUser(null); // Reset User Data
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider;