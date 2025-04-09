import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; 
import './Szavazas.css';

export default function Szavazas({ user }) {
  // Állapotkezelések
  const [database, setDatabase] = useState([]); 
  const [newTitle, setNewTitle] = useState(""); 
  const [newDescription, setNewDescription] = useState(""); 
  const [newEndDate, setNewEndDate] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userId, setUserId] = useState(null); 

  // Komponens betöltésekor fut le
  useEffect(() => {
    fetchPolls(); 
    checkLoginStatus(); 
  }, []);

  // Ellenőrzi, hogy van-e token és userId a localStorage-ben
  function checkLoginStatus() {
    const token = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    
    if (token && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
    }
  }

  // Szavazások lekérése az adatbázisból
  async function fetchPolls() {
    try {
      const response = await axios.get("https://localhost:7285/api/Poll/All");
      console.log("Lekérdezett szavazások:", response.data);
      setDatabase(response.data);
    } catch (error) {
      console.error('Hiba az adatok lekérésekor:', error);
    }
  }

  // Szavazás leadása (igen vagy nem)
  async function handleVote(id, type) {
    if (!isLoggedIn) {
      alert("Be kell jelentkezned a szavazáshoz!");
      return;
    }

    const poll = database.find(item => item.id === id);
    if (poll && isPollExpired(poll.endingAt)) {
      alert("Ez a szavazás már lejárt!");
      return;
    }

    const votedPolls = JSON.parse(localStorage.getItem("votedPolls")) || [];

    if (votedPolls.includes(id)) {
      alert("Már szavaztál erre a szavazásra!");
      return;
    }

    const voteEndpoint = type === "yes" ? "Yes" : "No";

    try {
      const response = await axios.put(
        `https://localhost:7285/api/Poll/${voteEndpoint}?id=${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("Válasz a szervertől:", response.data);
      localStorage.setItem("votedPolls", JSON.stringify([...votedPolls, id]));

      // Állapot frissítése helyben
      setDatabase(prevDatabase =>
        prevDatabase.map(item =>
          item.id === id ? { ...item, [type]: item[type] + 1 } : item
        )
      );
    } catch (error) {
      console.error("Hiba a szavazás mentésekor:", error);
    }
  }

  // Új szavazás létrehozása
  async function handleSubmit(event) {
    event.preventDefault();

    if (!isLoggedIn) {
      alert("Be kell jelentkezned a szavazás létrehozásához!");
      return;
    }

    if (!newTitle.trim() || !newDescription.trim() || !newEndDate) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    const selectedDate = new Date(newEndDate);
    const currentDate = new Date();

    if (selectedDate.toString() === "Invalid Date") {
      alert("Érvénytelen dátum formátum!");
      return;
    }

    if (selectedDate <= currentDate) {
      alert("A lejárati dátumnak a jövőben kell lennie!");
      return;
    }

    const newPoll = {
      id: uuidv4(), 
      title: newTitle,
      description: newDescription,
      yes: 0,
      no: 0,
      posterId: userId,
      endingAt: newEndDate
    };

    try {
      const response = await axios.post(
        "https://localhost:7285/api/Poll",
        newPoll,
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      console.log("Új szavazás létrehozva:", response.data);
      setDatabase([...database, response.data]); 
      setNewTitle("");
      setNewDescription("");
      setNewEndDate("");
    } catch (error) {
      console.error('Hiba a szavazás létrehozásakor:', error);
      alert("Hiba történt a szavazás létrehozásakor! Ellenőrizd a konzolt.");
    }
  }

  // Lejárati dátum formázása magyar formátumra
  function formatDate(dateString) {
    const options = { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    };
    return new Date(dateString).toLocaleDateString('hu-HU', options);
  }

  // Ellenőrzi, hogy egy szavazás lejárt-e
  function isPollExpired(endingAt) {
    return new Date(endingAt) < new Date();
  }

  // JSX visszatérés
  return (
    <div>
      <div className='sor2'></div>
      <div className='Fo'>
        <div className='lead'>
          <form onSubmit={handleSubmit}>
            <h4>Új szavazás létrehozása</h4>
            {!isLoggedIn && <p className="warning">Be kell jelentkezned a szavazás létrehozásához!</p>}
            <p>
              <input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder='Szavazás címe'
                className="input-field"
                disabled={!isLoggedIn}
                required
              />
            </p>
            <p>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder='Szavazás leírása'
                className="textarea-field"
                disabled={!isLoggedIn}
                required
              />
            </p>
            <p>
              <input
                type='datetime-local'
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
                className="input-field"
                disabled={!isLoggedIn}
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </p>
            <p><input type='submit' value='Létrehozás' className="submit-btn" disabled={!isLoggedIn} /></p>
          </form>
        </div>
      </div>

      <div className='szavaz-container'>
        {database.map((data) => {
          const expired = isPollExpired(data.endingAt);
          return (
            <div key={data.id} className={`szavaz ${expired ? 'expired' : ''}`}>
              <h2>{data.title}</h2>
              <h4>{data.description}</h4>
              <p className="end-date">
                {expired 
                  ? `Lejárt: ${formatDate(data.endingAt)}` 
                  : `Lejár: ${formatDate(data.endingAt)}`}
              </p>
              {expired && <p className="expired-message">Ez a szavazás lejárt</p>}
              <div className='vote-buttons'>
                <button 
                  className={`vote-btn ${expired ? 'btn-disabled' : 'btn-primary yes'}`} 
                  onClick={() => handleVote(data.id, 'yes')} 
                  disabled={!isLoggedIn || expired}
                >
                  Igen ({data.yes})
                </button>
                <button 
                  className={`vote-btn ${expired ? 'btn-disabled' : 'btn-primary no'}`} 
                  onClick={() => handleVote(data.id, 'no')} 
                  disabled={!isLoggedIn || expired}
                >
                  Nem ({data.no})
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className='sor'></div>
    </div>
  );
}
