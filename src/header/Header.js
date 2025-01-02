import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="topnav">
            <div id='nav'></div>
                <div className="topnav">
                <Link to= "/">
                    <a  href= "#!">főoldal</a>
                </Link>

                <Link to= "Szavazas">
                    <a href="#!">Szavazás</a>
                </Link>

                <Link to="Segitsegkeres">
                    <a  href="#!">Segítség kérése</a>
                </Link>

                <Link to = "Bejelentkezes">
                    <a id='bejelentkezes' href="#!">Bejelentkezés</a>
                </Link>

                    
                    
            </div>
      
    </header>
  );
}

export default Header;
