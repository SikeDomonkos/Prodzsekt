import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="topnav">
            <div id='nav'></div>
                <div className="topnav">
                
                    <a  href= "#!">főoldal</a>
                    <a href="#!">Szavazás</a>
                    <a  href="#!">Segítség kérése</a>
                    <a id='bejelentkezes' href="#!">Bejelentkezés</a>
                    <input type="search" placeholder="Keresés.."></input>
                    
            </div>
      
    </header>
  );
}

export default Header;
