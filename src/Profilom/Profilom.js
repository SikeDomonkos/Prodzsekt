import React, { useState, useEffect } from 'react';
import "./Profilom.css";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    lakasSzovNev: '',
    dateOfBirth: '',
    varos: '' 
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    setLoading(true);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    fetch(`https://localhost:7285/auth/profile?id=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
      }
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data);
        setFormData({
          phoneNumber: data.phoneNumber || '',
          lakasSzovNev: data.lakasSzovNev || '',
          dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
          varos: data.varos || ''  
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const formattedDateOfBirth = new Date(formData.dateOfBirth)
      .toISOString()
      .split('T')[0]; 

    fetch(`https://localhost:7285/auth/personal?id=${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNumber: formData.phoneNumber,
        lakasSzovNev: formData.lakasSzovNev,
        dateOfBirth: formattedDateOfBirth,
        varos: formData.varos  
      })
    })
      .then(response => {
        if (response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); 
        } else {
          return response.text(); 
        }
      })
      .then(data => {
        if (typeof data === 'string') {
          console.log('Server response:', data);
          alert(data);
        } else {
          setProfile(data); 
          setIsEditing(false); 
        }
        window.location.reload(); 
      })
      .catch(error => {
        alert(`Hiba történt: ${error.message}`);
        console.error('Error:', error); 
      });
  };

  return (
    <div className="profile">
      {loading && <p className="loading">Profil betöltése...</p>}

      {profile && (
        <div className="profile-card">
          <h2>{profile.fullName}</h2>
          <p><strong>Felhasználónév:</strong> {profile.userName}</p>
          <p><strong>Város:</strong> {profile.varos}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {profile.phoneNumber && (
            <p><strong>Telefonszám:</strong> {profile.phoneNumber}</p>
          )}
          {profile.lakasSzovNev && (
            <p><strong>Lakásszövetkezet neve:</strong> {profile.lakasSzovNev}</p>
          )}
          {profile.dateOfBirth && (
            <p><strong>Születési dátum:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
          )}
          
          {profile.fizetesiElmaradas && profile.fizetesiElmaradas > 0 && (
            <p className="payment-warning">
              <strong>Fizetés elmaradás!</strong> {profile.fizetesiElmaradas} Ft
            </p>
          )}

          <button onClick={handleEditClick}>Szerkesztés</button>
        </div>
      )}

      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Profil szerkesztése</h2>
            <label>
              Telefonszám:
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
            <label>
            Lakásszövetkezet neve:
              <input
                type="text"
                name="lakasSzovNev"
                value={formData.lakasSzovNev}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Születési dátum:
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Város:
              <input
                type="text"
                name="varos"  
                value={formData.varos}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleSave}>Mentés</button>
            <button onClick={() => setIsEditing(false)}>Mégse</button>
          </div>
        </div>
      )}
    </div>
  );
}