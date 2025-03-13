import React, { useEffect, useState } from 'react';
import './Help.css';

export default function Help() {
  const [database, setDatabase] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    console.log("Komponens betöltődött, adatok lekérése...");
    fetchData();
  }, []);

  // Adatok lekérése
  function fetchData() {
    setLoading(true);
    setError(null);
    console.log("Lekérési kérés elküldése...");

    fetch('https://localhost:7285/api/Post/All')
      .then(response => {
        console.log("Szerver válasz:", response);
        if (!response.ok) {
          throw new Error(`Hálózati hiba! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Lekérdezett adatok:", data);
        setDatabase(data);
      })
      .catch(error => {
        console.error("Hiba történt:", error);
        setError(error.message);
      })
      .finally(() => {
        console.log("Adatok lekérése befejeződött.");
        setLoading(false);
      });
  }

  // Post létrehozása
  function handleSubmit(event) {
    event.preventDefault();

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
      id: crypto.randomUUID(), // Automatikus azonosító
      PosterId: crypto.randomUUID(),
      acceptorId: "null", // Az acceptorId itt van hozzáadva, alapértelmezetten null
      title,
      description,
      location // Új mező
    };

    fetch("https://localhost:7285/api/Post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err.title || "Hiba történt!"); });
        }
        return response.json();
      })
      .then(data => {
        console.log("Új bejegyzés létrehozva:", data);
        setDatabase(prevDatabase => [...prevDatabase, data]);
        setTitle('');
        setDescription('');
        setLocation('');
      })
      .catch(error => {
        console.error('Hiba a létrehozáskor:', error);
        alert("Hiba történt a segítségkérés mentésekor: " + error.message);
      });
  }

  return (
    <div className='Fo'>
      <div className="card">
        <h2>Segítség kérése</h2>
        <form onSubmit={handleSubmit}>
          <p>Írd le, miben kell segíteni, a neved(-nak/-nek), és hol van szükség segítségre!</p>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Cím"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Leírás"
          />
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Hova kell a segítség?"
          />
          <input type='submit' value="Beküldés" />
        </form>
      </div>

      {loading && <p>Adatok betöltése...</p>}
      {error && <p className="error">Hiba történt: {error}</p>}

      {database.length > 0 ? (
        database.map((item, index) => (
          <div key={index} className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><strong>Helyszín:</strong> {item.location}</p>
          </div>
        ))
      ) : (
        !loading && !error && <p>Nincs elérhető adat.</p>
      )}
      <div className='sor1'></div>
    </div>
  );
}
