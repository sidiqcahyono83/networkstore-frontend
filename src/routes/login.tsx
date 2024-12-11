import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Simpan token dan adminId di localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("level", data.level); // Pastikan adminId ada dalam respons
        localStorage.setItem("username", username);

        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center justify-between px-g py-6 mx-auto h-screen">
        <form onSubmit={handleLogin} className="space-y-4">
          <h1 className="text-2xl mb-4">Login</h1>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            required
          />
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
