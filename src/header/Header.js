import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
    
  return (
    <header className="topnav">
            <div id='nav'>
                <div className="topnav">
                <NavLink className="topnavLink" to= "/">
                    Főoldal
                </NavLink>

                <NavLink className="topnavLink" to= "Szavazas">
                    Szavazás
                </NavLink>

                <NavLink className="topnavLink" to="Segitsegkeres">
                    Segítség kérése
                </NavLink>

                <NavLink className="topnavLink" to = "Bejelentkezes">
                    Bejelentkezés
                </NavLink>

                    
            </div>
            </div>
      
    </header>
  );
}

export default Header;
