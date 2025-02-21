import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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

    setDatabase(prevDatabase =>
      prevDatabase.map(item =>
        item.id === id
          ? { ...item, [type]: item[type] + 1 }
          : item
      )
    );

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
        fetchPolls();
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
      id: uuidv4(),
      title: newTitle,
      description: newDescription,
      yes: 0,
      no: 0,
      posterId: user?.id || "unknown"
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

  function handleDelete(id) {
    if (!window.confirm("Biztosan lezárod ezt a szavazást?")) {
      return;
    }

    fetch(`https://localhost:7285/api/Poll/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Hiba a szavazás törlésekor.");
        }
        return response.text();
      })
      .then(() => {
        console.log(`Szavazás (${id}) törölve.`);
        setDatabase(prevDatabase => prevDatabase.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("Hiba a szavazás törlésekor:", error);
        alert("Hiba történt a szavazás lezárásakor.");
      });
  }

  return (
    <div>
      <div className='Fo'>
        <div className='lead'>
          <form onSubmit={handleSubmit}>
            <h4>Új szavazás létrehozása</h4>
            <p>
              <input
                type='text'
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder='Szavazás címe'
                className="input-field"
              />
            </p>
            <p>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder='Szavazás leírása'
                className="textarea-field"
              />
            </p>
            <p><input type='submit' value='Létrehozás' className="submit-btn" /></p>
          </form>
        </div>
      </div>

      <div className='szavaz-container'>
        {database.map((data) => (
          <div key={data.id} className='szavaz'>
            <h2>{data.title}</h2>
            <h4>{data.description}</h4>
            <div className='vote-buttons'>
              <button className='vote-btn yes' >
                Igen ({data.yes})
              </button>
              <button className='vote-btn no' >
                Nem ({data.no})
              </button>
            </div>
            <button className='delete-btn'>
              Szavazás lezárása
            </button>
          </div>
        ))}
      </div>
      <div className='sor'>

      </div>
    </div>
  );
}
