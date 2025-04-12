import React from "react";
import "./Navbar.css"; // Import external CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
