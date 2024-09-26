import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // Remove unnecessary fetch call
  // if you want to fetch data when `currentUser` is available, you should handle it here properly

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>गतिSunya</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/list">List</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.png"} alt="Avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Register
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu Icon"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/list">List</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">SignIn</Link>
          {currentUser && <Link to="/profile">Profile</Link>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
