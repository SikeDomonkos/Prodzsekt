import React from 'react'
import './Bejelentkezes.css';

export default function Bejelentkezes() {
  return (
    <div id='forma'>
        <div id='pozi'>
            <div class="form-container">
                     <p>Bejelentkezés</p>

            <form class="form">
            <label>Felhasználónév</label>
            <input type="text" class="input" placeholder="Írd be a felhasználóneved"/>
                    <label>Email</label>
                    <input type="text" class="input" placeholder="Írd be az emailed"/>
                    <label>Jelszó</label>
                    <input type="password" class="input" placeholder="Írd be a jelszavad"/> 
                    <button>Bejelentkezés</button>
            </form>
            </div>
        </div>


     <div id='masodik'>
        <div class="form-container">
               <p>Regisztráció</p>

            <form class="form">

                    <label>Felhasználónév</label>
                <input type="text" class="input" placeholder="Írd be a felhasználóneved"/>
                <label>Email</label>
                <input type="text" class="input" placeholder="Írd be az emailed"/>
                <label>Jelszó</label>
                <input type="password" class="input" placeholder="Írd be a jelszavad"/> 
                <button>Regisztráció</button>
            </form>
        </div>
    </div>





    </div>
  )
}
