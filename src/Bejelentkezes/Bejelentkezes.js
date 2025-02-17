import React, { useState } from 'react';
import './Bejelentkezes.css';

export default function Bejelentkezes() {
  const [showRegister, setShowRegister] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  
  const loginUser = async (userData) => {
    try {
      const response = await fetch('https://localhost:7047/UserAccounts/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Hiba történt a bejelentkezés során!');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error.message;
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const userData = { username: loginUsername, password: loginPassword };
      const result = await loginUser(userData);

      localStorage.setItem('user', JSON.stringify(result));

      
      window.location.href = '/dashboard';
    } catch (error) {
      setLoginError(error);
    }
  };

  return (
    <div id='forma' className='Fo'>
      {/* Bejelentkezési űrlap */}
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
            <div id='also'>
              <input
                type="password"
                className="input"
                placeholder="Írd be a jelszavad"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button type="submit">Bejelentkezés</button>
          </form>
          <button onClick={() => setShowRegister(true)}>Regisztráció</button>
        </div>
      </div>

      {/* Regisztrációs Modal */}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}


const registerUser = async (userData) => {
  try {
    const response = await fetch('https://localhost:7047/UserAccounts/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Hiba történt a regisztráció során!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message;
  }
};


function RegisterModal({ onClose }) {
  const [username, setUsername] = useState('');
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
      const userData = { username, email, password };
      await registerUser(userData);
      setSuccessMessage('Sikeres regisztráció! Kérlek jelentkezz be.');
      setErrorMessage('');
      setTimeout(onClose, 2500);
    } catch (error) {
      setErrorMessage(error);
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
          <label>Felhasználónév</label>
          <input
            type="text"
            className="input"
            placeholder="Írd be a felhasználóneved"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
