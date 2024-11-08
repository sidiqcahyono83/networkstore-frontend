import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const username = localStorage.getItem("username");
  const isLoggedIn = Boolean(username);
  const navigate = useNavigate();
  const location = useLocation(); // Untuk melacak path saat ini
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

  // Fungsi untuk memeriksa apakah link saat ini aktif
  const isActive = (path: string) => location.pathname === path;

  // Menu untuk user "sidiqcahyono"
  const sidiqcahyonoMenu = (
    <>
      <Link
        to="/pppoe"
        className={`text-white py-2 px-4 ${
          isActive("/pppoe") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        PPP
      </Link>
      <Link
        to="/users"
        className={`text-white py-2 px-4 ${
          isActive("/users") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Customers
      </Link>

      <Link
        to="/Area"
        className={`text-white py-2 px-4 ${
          isActive("/Area") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Area
      </Link>
      <Link
        to="/paket"
        className={`text-white py-2 px-4 ${
          isActive("/paket") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Paket
      </Link>
      <Link
        to="/odp"
        className={`text-white py-2 px-4 ${
          isActive("/odp") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        ODP
      </Link>
      <Link
        to="/pembayaran"
        className={`text-white py-2 px-4 ${
          isActive("/pembayaran") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Pembayaran
      </Link>
      <Link
        to="/belum-bayar"
        className={`text-white py-2 px-4 ${
          isActive("/belum-bayar") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Belum Bayar
      </Link>

      <Link
        to="/filterpembayaran"
        className={`text-white py-2 px-4 ${
          isActive("/filterpembayaran") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Filter-Pembayaran
      </Link>
    </>
  );

  // Menu untuk user "misbah" atau "ismono"
  const limitedMenu = (
    <>
      {/* <Link
        to="/users"
        className={`text-white py-2 px-4 ${
          isActive("/users") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Customers
      </Link> */}
      <Link
        to="/belum-bayar"
        className={`text-white py-2 px-4 ${
          isActive("/belum-bayar") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Belum Bayar
      </Link>
      <Link
        to="/pembayaran"
        className={`text-white py-2 px-4 ${
          isActive("/pembayaran") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        Pembayaran
      </Link>

      <Link
        to="/pppoe"
        className={`text-white py-2 px-4 ${
          isActive("/pppoe") ? "bg-blue-600 p-3 rounded-lg" : ""
        }`}
      >
        PPP
      </Link>
    </>
  );

  return (
    <div className="bg-gray-600 text-gray-200">
      <nav className="p-4 flex justify-between items-center max-w-screen-2xl mx-auto">
        <div className="flex items-center">
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="text-white text-lg font-bold mr-6"
          >
            {isLoggedIn ? "Dashboard" : "Home"}
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
            } absolute top-16 left-0 w-full bg-gray-600 md:flex md:relative md:top-0 md:w-auto md:ml-6`}
          >
            <div className="flex flex-col md:flex-row md:space-x-6">
              {/* Tampilkan menu sesuai username */}
              {username === "sidiqcahyono" && sidiqcahyonoMenu}
              {(username === "misbah" ||
                username === "ismono" ||
                username === "hujin") &&
                limitedMenu}
            </div>
          </div>
        </div>
        <div className="text-white">
          {username ? (
            <div className="flex items-center">
              <span className="mr-4">Welcome, {username}</span>
              <button
                onClick={handleLogout}
                className="hover:bg-red-400 bg-slate-800 p-1 items-center rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth/login" className="text-white">
              Login
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};
