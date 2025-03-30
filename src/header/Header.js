import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
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
      
        <div className="logo">
          <img src="https://cdn-icons-png.flaticon.com/512/6001/6001127.png" alt="Logo" />
          <span>E-Panel</span>
        </div>

      
        <nav className={`nav-links ${isOpen ? "active" : ""}`}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Főoldal</NavLink>
          <NavLink to="/Szavazas" onClick={() => setIsOpen(false)}>Szavazás</NavLink>
          <NavLink to="/Segitsegkeres" onClick={() => setIsOpen(false)}>Segítség</NavLink>

          {isLoggedIn && (
            <NavLink to="/Profilom" onClick={() => setIsOpen(false)}>Profilom</NavLink>
          )}

          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>Kijelentkezés</button>
          ) : (
            <NavLink to="/Bejelentkezes" onClick={() => setIsOpen(false)}>Bejelentkezés</NavLink>
          )}
        </nav>

       
        <div className="search-box">
          <input type="search" placeholder="Keresés..." />  
          <FaSearch className="search-icon" />
        </div>

      
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}

export default Header;
