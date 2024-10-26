import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminId");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between">
      <div>
        <Link to="/" className="text-white mr-4">
          Home
        </Link>
        {/* <Link to="/usersSudahbayar" className="text-white mr-4">
          Sudah Bayar
        </Link> */}
        <Link to="/users" className="text-white mr-4">
          Users
        </Link>
        <Link to="/usersBelumBayar" className="text-white mr-4">
          Belum Bayar
        </Link>
        <Link to="/pembayaran" className="text-white mr-4">
          Pembayaran
        </Link>
        <Link to="/filterpembayaran" className="text-white">
          Filter-Pembayaran
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
