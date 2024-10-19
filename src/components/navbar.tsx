// src/components/Navbar.tsx

import { Link } from "react-router-dom";

export const Navbar = () => {
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload(); // Reload page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <div>
        <Link to="/" className="text-white mr-4">
          Home
        </Link>
        <Link to="/products" className="text-white mr-4">
          Products
        </Link>
        <Link to="/users" className="text-white mr-4">
          Users
        </Link>
        <Link to="/pembayaran" className="text-white">
          Pembayaran
        </Link>
      </div>
      <div className="text-white">
        {username ? (
          <>
            <span className="mr-4">Welcome, {username}</span>
            <button onClick={handleLogout} className="bg-red-500 p-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
