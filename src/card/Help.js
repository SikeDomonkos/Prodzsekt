import React, { useEffect, useState } from 'react';
import './Help.css';

export default function Help() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchData();
    checkLoginStatus();
  }, []);

  function checkLoginStatus() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!token);
    if (token && userId) {
      setUserId(userId);
    }
  }

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://localhost:7285/api/Post/All');
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received posts data:', data);
      
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        console.warn('Expected array but received:', data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isLoggedIn || !userId) {
      alert("Be kell jelentkezned a segítségkérés létrehozásához!");
      return;
    }

    if (!title.trim() || !description.trim() || !location.trim()) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Nincs bejelentkezett felhasználó!");
      return;
    }

    const newPost = {
      posterId: userId,
      title,
      description,
      location
    };

    try {
      const response = await fetch("https://localhost:7285/api/Post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newPost)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ismeretlen hiba történt");
      }

      const responseData = await response.json();
      console.log("Új bejegyzés létrehozva:", responseData);
      
      setTitle('');
      setDescription('');
      setLocation('');
      alert("Segítségkérés sikeresen létrehozva!");
      
      // Frissítjük a posztok listáját
      await fetchData();
    } catch (error) {
      console.error('Hiba a létrehozáskor:', error);
      alert(`Hiba történt a segítségkérés mentésekor: ${error.message}`);
    }
  }

  return (
    
    <div className='help-container'>
      <div className='sor2'></div>
      <div className="help-form-card">
       
        <h2>Segítség kérése</h2>
        <form onSubmit={handleSubmit}>
          <p>Írd le, miben kell segíteni, a neved(-nak/-nek), és hol van szükség segítségre!</p>
          {!isLoggedIn && <p className="warning">Be kell jelentkezned a segítségkérés létrehozásához!</p>}
          
          <div className="form-group">
            <label htmlFor="title">Cím:</label>
            <input
              id="title"
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Cím"
              disabled={!isLoggedIn}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Leírás:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Leírás"
              disabled={!isLoggedIn}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Helyszín:</label>
            <input
              id="location"
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Hova kell a segítség?"
              disabled={!isLoggedIn}
              required
            />
          </div>
          
          <button 
            type='submit' 
            className="submit-button"
            disabled={!isLoggedIn || loading} 
          >
            {loading ? 'Feldolgozás...' : 'Beküldés'}
          </button>
        </form>
      </div>

      <div className="posts-section">
       
        
        {loading && <div className="loading-spinner">Adatok betöltése...</div>}
        
        {error && (
          <div className="error-message">
            <p>Hiba történt: {error}</p>
            <button onClick={fetchData} className="retry-button">Újrapróbálkozás</button>
          </div>
        )}

        <div className="posts-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.title || 'Nincs cím'}</h3>
                <p className="post-description">{post.description || 'Nincs leírás'}</p>
                <div className="post-details">
                  <p className="post-location">
                    <strong>Helyszín:</strong> {post.location || 'Nincs megadva'}
                  </p>
                  <p className="post-date">
                    <strong>Létrehozva:</strong> {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Ismeretlen dátum'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            !loading && !error && <p className="no-posts-message">Nincs elérhető segítségkérés.</p>
          )}
        </div>
      </div>
      <div className='sor'></div>
    </div>
  );
}