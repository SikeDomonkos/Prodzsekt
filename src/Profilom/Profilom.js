import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.get(`https://localhost:7285/auth/profile?id=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        }
      });

      setProfile(response.data);
      setFormData({
        phoneNumber: response.data.phoneNumber || '',
        lakasSzovNev: response.data.lakasSzovNev || '',
        dateOfBirth: response.data.dateOfBirth ? response.data.dateOfBirth.split('T')[0] : '',
        varos: response.data.varos || ''  
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
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

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const formattedDateOfBirth = new Date(formData.dateOfBirth)
      .toISOString()
      .split('T')[0]; 

    try {
      const response = await axios.put(
        `https://localhost:7285/auth/personal?id=${userId}`,
        {
          phoneNumber: formData.phoneNumber,
          lakasSzovNev: formData.lakasSzovNev,
          dateOfBirth: formattedDateOfBirth,
          varos: formData.varos  
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (typeof response.data === 'string') {
        console.log('Server response:', response.data);
        alert(response.data);
      } else {
        setProfile(response.data); 
        setIsEditing(false); 
      }
      window.location.reload();
    } catch (error) {
      alert(`Hiba történt: ${error.response?.data?.message || error.message}`);
      console.error('Error:', error); 
    }
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