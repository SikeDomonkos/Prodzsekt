import { useState } from 'react';
import './Bejelentkezes.css';

export default function Bejelentkezes() {
  const [showRegister, setShowRegister] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const loginUser = async (userData) => {
    try {
      const response = await fetch('https://localhost:7285/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        throw new Error(errorData.message || 'Hiba történt a bejelentkezés során!');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      console.error('Hiba:', error.message);
      throw new Error(error.message || 'Nem elérhető a szerver.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const userData = { username: loginUsername, password: loginPassword };
      await loginUser(userData);
      window.location.href = '/dashboard';
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
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </div>
  );
}

const registerUser = async (userData) => {
  try {
    const response = await fetch('https://localhost:7285/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Register error:', errorData);
      throw new Error(errorData.message || 'Hiba történt a regisztráció során!');
    }

    return await response.json();
  } catch (error) {
    console.error('Hiba:', error.message);
    throw new Error(error.message || 'A szerver nem válaszol.');
  }
};

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
