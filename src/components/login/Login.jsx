import "./login.css";

import React, { useState } from "react";

function Login({ setToken }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    const userData = { email, password };

    try {
      setLoading(true);
      const res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const data = await res.json();

        setToken(data.token);
      } else if (res.status === 400) {
        const data = await res.json();
        alert(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter the email</label>
          <input type="text" name="email" id="email" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">Enter the password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button disabled={loading}>{loading ? "Loading..." : "Login"}</button>
      </form>
    </div>
  );
}

export default Login;
