import React, { useEffect, useState } from 'react';
import './Help.css';

export default function Help() {
  const [database, setDatabase] = useState([]); // Adatbázis állapot tárolása
  const [loading, setLoading] = useState(true); // Betöltési állapot
  const [error, setError] = useState(null); // Hiba állapot
  const [title, setTitle] = useState(''); // Cím állapot
  const [description, setDescription] = useState(''); // Leírás állapot

  useEffect(() => {
    console.log("Komponens betöltődött, adatok lekérése...");
    fetchData(); // Adatok lekérése a komponens betöltődésekor
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
        setDatabase(data); // Adatok beállítása az adatbázishoz
      })
      .catch(error => {
        console.error("Hiba történt:", error);
        setError(error.message); // Hiba kezelés
      })
      .finally(() => {
        console.log("Adatok lekérése befejeződött.");
        setLoading(false); // Betöltési állapot befejezése
      });
  }

  // Post létrehozása
  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Minden mezőt ki kell tölteni!"); // Ellenőrizd, hogy a mezők nincsenek üresen
      return;
    }

    const newPost = { title, description };

    fetch("https://localhost:7285/api/Poll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost) // Az új post adatainak elküldése
    })
      .then(response => response.json())
      .then(data => {
        console.log("Új bejegyzés létrehozva:", data);
        setDatabase(prevDatabase => [...prevDatabase, data]); // Az új post hozzáadása az adatbázishoz
        setTitle(''); // Űrlap mezők törlése
        setDescription('');
      })
      .catch(error => {
        console.error('Hiba a létrehozáskor:', error);
        alert("Hiba történt a segítségkérés mentésekor.");
      });
  }

  return (
    <div className='Fo'>
      <div className="card">
        <h2>Segítség kérése</h2>
        <form onSubmit={handleSubmit}>
          <p>Írd le, miben kell segíteni és a neved(-nak/-nek)!</p>
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
            
          </div>
        ))
      ) : (
        !loading && !error && <p>Nincs elérhető adat.</p>
      )}
      <div className='sor1'>
        
      </div>
    </div>
  );
}
