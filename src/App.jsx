import React, { useEffect, useState } from "react";
import Login from "./components/login/Login";
import Products from "./components/products/Products";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return token === "" ? (
    <Login setToken={handleSetToken} />
  ) : (
    <Products handleLogout={handleLogout} />
  );
}

export default App;
