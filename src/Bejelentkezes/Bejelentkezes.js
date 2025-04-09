import { useState } from 'react';
import axios from 'axios';
import './Bejelentkezes.css';

// JWT token dekódolása
const decodeToken = (token) => {
  try {
    // A token felosztása részekre és a payload kinyerése
    const [, payload] = token.split(".");
    // Base64 dekódolás és JSON parse
    const decoded = JSON.parse(atob(payload));
    console.log("Dekódolt token tartalma:", decoded);
    return decoded;
  } catch (error) {
    console.error("Token dekódolási hiba:", error);
    return null;
  }
};

// Szerverről érkező hibák fordítása magyarra
const translateError = (errorType) => {
  switch (errorType) {
    case 'INVALID_FULLNAME': return 'Hiba a teljes névnél!';
    case 'INVALID_USERNAME': return 'Hiba a felhasználónévnél!';
    case 'INVALID_EMAIL': return 'Hiba az email címnél!';
    case 'INVALID_PASSWORD': return 'Hiba a jelszónál!';
    case 'PASSWORDS_DO_NOT_MATCH': return 'A jelszavak nem egyeznek!';
    case 'USERNAME_TAKEN': return 'A felhasználónév már foglalt!';
    case 'EMAIL_TAKEN': return 'Az email cím már foglalt!';
    case 'LOGIN_FAILED': return 'Hibás felhasználónév vagy jelszó!';
    default: return 'Ismeretlen hiba történt!';
  }
};

// Bejelentkezési függvény
const loginUser = async (userData) => {
  try {
    // POST kérés küldése a bejelentkezési végpontra
    const response = await axios.post('https://localhost:7285/auth/login', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });

    console.log("Szerver válasza:", response.data);

    // Token mentése localStorage-ba
    localStorage.removeItem('token');
    localStorage.setItem('token', response.data.token);

    // Token dekódolása és userId kinyerése
    const decoded = decodeToken(response.data.token);
    if (decoded && decoded.sub) {
      localStorage.setItem('userId', decoded.sub);
      console.log("userId elmentve:", decoded.sub);
    } else {
      console.error("A token nem tartalmaz userId-t (sub mezőt)!");
      throw new Error("A token nem tartalmaz userId-t (sub mezőt)!");
    }

    return response.data;
  } catch (error) {

    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// Regisztrációs függvény
const registerUser = async (userData) => {
  try {
    // POST kérés küldése a regisztrációs végpontra
    const response = await axios.post('https://localhost:7285/auth/register', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });

    return response.data;
  } catch (error) {
 
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

// Fő Bejelentkezés komponens
export default function Bejelentkezes() {
  // Állapotok kezelése
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  // Bejelentkezési űrlap kezelése
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const userData = { username: loginUsername, password: loginPassword };
      await loginUser(userData);
      // Sikeres bejelentkezés után átirányítás a profil oldalra
      window.location.href = '/Profilom';
    } catch (error) {
      setLoginError(translateError(error.errorType || 'LOGIN_FAILED'));
    }
  };

  return (
    <div id='forma' className='Fo'>
      <div className='forms'>
        <div className="form-container">
          <p>Bejelentkezés</p>
          {loginError && <p className="error">{loginError}</p>}
          <form className="form" onSubmit={handleLoginSubmit}>
            <label>Felhasználónév</label>
            <input
              type="text"
              className="input"
              placeholder="Írd be a felhasználóneved"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <label>Jelszó</label>
            <input
              type="password"
              className="input"
              placeholder="Írd be a jelszavad"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit">Bejelentkezés</button>
          </form>
          {/* Regisztrációs modal megnyitása */}
          <button onClick={() => setShowRegister(true)}>Regisztráció</button>
        </div>
      </div>
      {/* Regisztrációs modal megjelenítése */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}

// Regisztrációs Modal komponens
function RegisterModal({ onClose }) {
  // Állapotok kezelése
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Jelszavak egyezőségének ellenőrzése
    if (password !== confirmPassword) {
      setErrorMessage(translateError('PASSWORDS_DO_NOT_MATCH'));
      setSuccessMessage('');
      return;
    }

    try {
      const userData = { fullname: fullName, username: userName, email, password };
      await registerUser(userData);
      setSuccessMessage('Sikeres regisztráció! Kérlek jelentkezz be.');
      setErrorMessage('');
      // 2.5 másodperc után modal bezárása
      setTimeout(onClose, 2500);
    } catch (error) {
      setErrorMessage(translateError(error.errorType));
      setSuccessMessage('');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Regisztráció</p>
        {/* Hiba- és sikerüzenetek megjelenítése */}
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form className="form" onSubmit={handleSubmit}>
          <label>Teljes név</label>
          <input
            type="text"
            className="input"
            placeholder="Írd be a teljes neved"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label>Felhasználónév</label>
          <input
            type="text"
            className="input"
            placeholder="Írd be a felhasználóneved"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            className="input"
            placeholder="Írd be az emailed"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Jelszó</label>
          <input
            type="password"
            className="input"
            placeholder="Írd be a jelszavad"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Jelszó megerősítése</label>
          <input
            type="password"
            className="input"
            placeholder="Írd be újra a jelszavad"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Regisztráció</button>
        </form>
        <button className="close-btn" onClick={onClose}>Bezárás</button>
      </div>
    </div>
  );
}