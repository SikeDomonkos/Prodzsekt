import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; 
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

function Header() {
  // Állapot, hogy a menü nyitva van-e mobilnézetben
  const [isOpen, setIsOpen] = useState(false);

  // Állapot, hogy a felhasználó be van-e jelentkezve
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Ellenőrzés a komponens betöltésekor, hogy van-e token
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); 
  }, []);

 
  const handleLogout = () => {
    localStorage.clear(); 
    setIsLoggedIn(false); 
    window.location.href = "/Bejelentkezes"; 
  };

  return (
    <header className="navbar">
      <div className="container">
      
        {/* Logó és cím */}
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/6001/6001127.png" alt="Logo" />
          <span>E-Panel</span>
        </div>

        {/* Navigációs linkek — mobilnézetben az "active" osztály nyitja meg */}
        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Főoldal</NavLink>
          <NavLink to="/Szavazas" onClick={() => setIsOpen(false)}>Szavazás</NavLink>
          <NavLink to="/Segitsegkeres" onClick={() => setIsOpen(false)}>Segítség</NavLink>

          {/* Csak bejelentkezett felhasználók számára elérhető menüpont */}
          {isLoggedIn && (
            <NavLink to="/Profilom" onClick={() => setIsOpen(false)}>Profilom</NavLink>
          )}

          {/* Bejelentkezés / Kijelentkezés gomb dinamikusan jelenik meg */}
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>Kijelentkezés</button>
          ) : (
            <NavLink to="/Bejelentkezes" onClick={() => setIsOpen(false)}>Bejelentkezés</NavLink>
          )}
        </nav>

        {/* Kereső mező ikonokkal */}
        <div className="search-box">
          <input type="search" placeholder="Keresés..." />
          <FaSearch className="search-icon" />
        </div>

        {/* Menü ikon mobilnézethez (hamburger és bezáró ikon) */}
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Header;
