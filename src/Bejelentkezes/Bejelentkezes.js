import React from 'react'
import './Bejelentkezes.css';

export default function Bejelentkezes() {
  return (
    <div id='forma'>
        <div id='pozi'>
            <div className="form-container">
                     <p>Bejelentkezés</p>

            <form className="form">
            <label>Felhasználónév</label>
            <input type="text" className="input" placeholder="Írd be a felhasználóneved"/>
                    <label>Email</label>
                    <input type="text" className="input" placeholder="Írd be az emailed"/>
                    <label>Jelszó</label>
                    <input type="password" className="input" placeholder="Írd be a jelszavad"/> 
                    <button>Bejelentkezés</button>
            </form>
            </div>
        </div>


     <div id='masodik'>
        <div className="form-container">
               <p>Regisztráció</p>

            <form className="form">

                    <label>Felhasználónév</label>
                <input type="text" className="input" placeholder="Írd be a felhasználóneved"/>
                <label>Email</label>
                <input type="text" className="input" placeholder="Írd be az emailed"/>
                <label>Jelszó</label>
                <input type="password" className="input" placeholder="Írd be a jelszavad"/> 
                <button>Regisztráció</button>
            </form>
        </div>
    </div>





    </div>
  )
}
