import React, { useState, useEffect } from 'react';
import "./Profilom.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); // userId lekérése

    if (!token || !userId) {
      setError('Nincs bejelentkezett felhasználó! Kérlek, jelentkezz be.');
      setLoading(false);
      return;
    }

    // Profil lekérése az id alapján
    fetch(`https://localhost:7285/auth/profile?id=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Token hozzáadása a headerhez
        'accept': '*/*' // Az accept header hozzáadása
      }
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Érvénytelen token vagy id. Kérlek, jelentkezz be újra!');
          }
          throw new Error('Hálózati hiba történt vagy a token érvénytelen');
        }
        return response.json();
      })
      .then(data => {
        console.log("Felhasználói profil adat:", data);
        setProfile(data); // A válasz alapján beállítjuk a profil adatokat
      })
      .catch(error => {
        console.error("Hiba történt:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="profile">
      {loading && <p className="loading">Profil betöltése...</p>}
      {error && <p className="error">Hiba történt: {error}</p>}

      {profile && (
        <div className="profile-card">
          <h2>{profile.fullName}</h2>
          <p><strong>Felhasználónév:</strong> {profile.userName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.age && <p><strong>Kor:</strong> {profile.age}</p>}
          {profile.dateOfBirth && (
            <p><strong>Születési dátum:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
}