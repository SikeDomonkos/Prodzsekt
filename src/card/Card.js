import React, { useEffect, useState } from 'react';
import './Card.css';

export default function Help({ data}) {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    Get();
  }, []);

  function Get() {
    fetch('http://localhost:5206/api/Poll/All') 
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDatabase(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  return (
    <div className='Fo'>
      {database.length > 0 ? (
        database.map((data, index) => (
          <div key={index}>
            <div className="card">
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              
              <input type='submit' />
            </div>
          </div>
        ))
      ) : (
        <p>Nincs elérhető adat.</p>
      )}
    </div>
  );
}
