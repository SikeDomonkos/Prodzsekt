import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // UUID generátor
import './Szavazas.css';

export default function Szavazas({ user }) {
  const [database, setDatabase] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchPolls();
  }, []);

  function fetchPolls() {
    fetch("https://localhost:7285/api/Poll/All")
      .then(response => response.json())
      .then(data => {
        console.log("Lekérdezett szavazások:", data);
        setDatabase(data);
      })
      .catch(error => console.error('Hiba az adatok lekérésekor:', error));
  }

  function handleVote(id, type) {
    if (!user) {
      alert("Jelentkezz be a szavazáshoz!");
      return;
    }

    // Frissíti a kliens oldali állapotot
    setDatabase(prevDatabase =>
      prevDatabase.map(item =>
        item.id === id
          ? { ...item, [type]: item[type] + 1 }
          : item
      )
    );

    // Küldés az API felé
    fetch(`https://localhost:7285/api/Poll/Vote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ voteType: type })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Szavazat mentve:", data);
        fetchPolls(); // Újra lekéri a friss adatokat
      })
      .catch(error => console.error("Hiba a szavazás mentésekor:", error));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    const newPoll = {
      id: uuidv4(), // Ha szükséges, egyedi UUID generálása
      title: newTitle,
      description: newDescription,
      yes: 0,
      no: 0,
      posterId: user?.id || "unknown" // Backend valószínűleg ezt várja
    };

    fetch("https://localhost:7285/api/Poll", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPoll)
    })
      .then(async response => {
        const text = await response.text();
        console.log("Szerver válasz:", text);
        return response.ok ? JSON.parse(text) : Promise.reject(text);
      })
      .then(data => {
        console.log("Új szavazás létrehozva:", data);
        setDatabase([...database, data]);
        setNewTitle("");
        setNewDescription("");
      })
      .catch(error => {
        console.error('Hiba a szavazás létrehozásakor:', error);
        alert("Hiba történt a szavazás létrehozásakor! Ellenőrizd a konzolt.");
      });
  }

  return (
    <div>
      <div className='Fo'>
        <div className='lead'>
          <form onSubmit={handleSubmit}>
            <h4>Új szavazás létrehozása</h4>
            <p><input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder='Szavazás címe' /></p>
            <p><input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder='Szavazás leírása' /></p>
            <p><input type='submit' value='Létrehozás' /></p>
          </form>
        </div>
      </div>

      <div className='szavaz-container'>
        {database.map((data) => (
          <div key={data.id} className='szavaz'>
            <h2>{data.title}</h2>
            <h4>{data.description}</h4>
            <div className='vote-buttons'>
              <button className='vote-btn yes' onClick={() => handleVote(data.id, 'yes')} disabled={!user}>
                Igen ({data.yes})
              </button>
              <button className='vote-btn no' onClick={() => handleVote(data.id, 'no')} disabled={!user}>
                Nem ({data.no})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
