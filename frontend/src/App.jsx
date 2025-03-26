import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router/Routes";
import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
