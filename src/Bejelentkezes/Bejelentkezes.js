import { useState } from 'react';
import './Bejelentkezes.css';

// Token dekódolása
const decodeToken = (token) => {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    console.log("Dekódolt token tartalma:", decoded); // Ellenőrizd a konzolon
    return decoded;
  } catch (error) {
    console.error("Token dekódolási hiba:", error);
    return null;
  }
};

// Felhasználó bejelentkeztetése
const loginUser = async (userData) => {
  try {
    const response = await fetch('https://localhost:7285/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Hiba történt a bejelentkezés során!');
    }

    const data = await response.json();
    console.log("Szerver válasza:", data);

    // Token mentése
    localStorage.removeItem('token');
    localStorage.setItem('token', data.token);

    // Token dekódolása és userId kinyerése (a `sub` mezőből)
    const decoded = decodeToken(data.token);
    if (decoded && decoded.sub) {
      localStorage.setItem('userId', decoded.sub); // userId mentése (a `sub` mezőből)
      console.log("userId elmentve:", decoded.sub); // Ellenőrizd a konzolon
    } else {
      console.error("A token nem tartalmaz userId-t (sub mezőt)!");
      throw new Error("A token nem tartalmaz userId-t (sub mezőt)!");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Nem elérhető a szerver.');
  }
};

// Felhasználó regisztrálása
const registerUser = async (userData) => {
  try {
    const response = await fetch('https://localhost:7285/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Hiba történt a regisztráció során!');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'A szerver nem válaszol.');
  }
};

export default function Bejelentkezes() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const userData = { username: loginUsername, password: loginPassword };
      await loginUser(userData);
      window.location.href = '/Profilom';
    } catch (error) {
      setLoginError(error.message);
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
          <button onClick={() => setShowRegister(true)}>Regisztráció</button>
        </div>
      </div>
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}

function RegisterModal({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('A jelszavak nem egyeznek!');
      setSuccessMessage('');
      return;
    }

    try {
      const userData = { fullname: fullName, username: userName, email, password };
      await registerUser(userData);
      setSuccessMessage('Sikeres regisztráció! Kérlek jelentkezz be.');
      setErrorMessage('');
      setTimeout(onClose, 2500);
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <p>Regisztráció</p>
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