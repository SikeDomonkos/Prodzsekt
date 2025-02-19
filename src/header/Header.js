import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import "./Header.css"; // Külső CSS

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Bejelentkezési állapot (teszteléshez true)

  return (
    <header className="navbar">
      <div className="container">
        
        {/* LOGÓ */}
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/6001/6001127.png" alt="Logo" />
          <span>E-Panel</span>
        </div>

        {/* NAVIGÁCIÓS MENÜ */}
        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Főoldal</NavLink>
          <NavLink to="/Szavazas" onClick={() => setIsOpen(false)}>Szavazás</NavLink>
          <NavLink to="/Segitsegkeres" onClick={() => setIsOpen(false)}>Segítség</NavLink>

          {/* Csak bejelentkezve látható */}
          {isLoggedIn && (
            <NavLink to="/Profilom" onClick={() => setIsOpen(false)}>Profilom</NavLink>
          )}

          {isLoggedIn ? (
            <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Kijelentkezés</button>
          ) : (
            <NavLink to="/Bejelentkezes" onClick={() => setIsOpen(false)}>Bejelentkezés</NavLink>
          )}
        </nav>

        {/* KERESŐSÁV */}
        <div className="search-box">
          <input type="search" placeholder="Keresés..." />
          <FaSearch className="search-icon" />
        </div>

        {/* HAMBURGER MENÜ MOBILRA */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    </header>
  );
}

export default Header;
