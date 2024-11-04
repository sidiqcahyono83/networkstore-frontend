import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("adminId");
    localStorage.removeItem("username");
    localStorage.removeItem("level");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-white text-lg font-bold mr-4">
          Home
        </Link>
        <button
          onClick={toggleMenu}
          className="text-white md:hidden focus:outline-none"
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gray-800 md:flex md:relative md:top-0 md:w-auto md:ml-4`}
        >
          <div className="flex flex-col md:flex-row">
            {username === "sidiqcahyono" && (
              <>
                <Link to="/pppoe" className="text-white py-2 px-4 md:mr-4">
                  PPP
                </Link>
                <Link to="/users" className="text-white py-2 px-4 md:mr-4">
                  Users
                </Link>
                <Link to="/Area" className="text-white py-2 px-4 md:mr-4">
                  Area
                </Link>
                <Link to="/" className="text-white py-2 px-4 md:mr-4">
                  Paket
                </Link>
                <Link to="/odp" className="text-white py-2 px-4 md:mr-4">
                  ODP
                </Link>
                <Link to="/pembayaran" className="text-white py-2 px-4 md:mr-4">
                  Pembayaran
                </Link>
                <Link
                  to="/usersBelumBayar"
                  className="text-white py-2 px-4 md:mr-4"
                >
                  Users Belum Bayar
                </Link>
                <Link to="/filterpembayaran" className="text-white py-2 px-4">
                  Filter-Pembayaran
                </Link>
              </>
            )}
            {(username === "hujin" || username === "misbah") && (
              <>
                <Link
                  to="/usersBelumBayar"
                  className="text-white py-2 px-4 md:mr-4"
                >
                  Users Belum Bayar
                </Link>
                <Link to="/pembayaran" className="text-white py-2 px-4 md:mr-4">
                  Pembayaran
                </Link>
                <Link to="/pppoe" className="text-white py-2 px-4 md:mr-4">
                  PPP
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-white">
        {username ? (
          <div className="flex items-center">
            <span className="mr-4">Welcome, {username}</span>
            <button onClick={handleLogout} className="bg-red-500 p-1 rounded">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
