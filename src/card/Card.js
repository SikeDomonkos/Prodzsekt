import React, { useEffect, useState } from 'react';
import './Card.css';

export default function Help({ description, date, name }) {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    Get();
  }, []);

  function Get() {
    fetch("http://25.15.67.98:7285/api/data") 
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
              <h2>Segítség kell {data.name}-nek</h2>
              <p>{data.description}</p>
              <p>Az alábbi napon kérem a segítséget: {data.date}</p>
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
