import React, { useEffect, useState } from 'react'
import './Szavazas.css'

export default function Szavazas({ title, description }) {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    Get();
  }, []);

  function Get() {
    fetch("https://localhost:7079/Poll")
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setDatabase(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  return (

    <div>
                <div className='Fo'>
                  <div className='lead'>
                    <h2>Szavazás índítása</h2>
                    <p>írja le a miről szeretne szavazni</p> <input type='text'></input>
                    <input type='submit'></input>
                  </div>
                </div>

              <div className='szavaz'>
                {
                  database.map((data) => 
                  (<div>
                    <h2>{data.title}</h2>
                    <h4>{data.description}</h4>
                        <table>
                            <tr>
                          
                                <td>
                                  <p id='igen'>Igen</p> <input type='checkbox' id='BtnIgen'></input>
                                
                                </td>
                                <td>
                                  <p id='nem'>Nem</p> <input type='checkbox' id='BtnNem'/>
                                </td>
                            </tr>

                      </table>                       
                   <input type='submit' id='kuldes'/>
                  </div>
                  ))
                }
             
              </div>

              
      </div>
  )
}