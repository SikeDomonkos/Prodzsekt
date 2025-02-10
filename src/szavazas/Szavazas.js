import React, { useEffect, useState } from 'react'
import './Szavazas.css'

export default function Szavazas({ title, description }) {
  const [database, setDatabase] = useState([]);

  useEffect(() => {
    Get();
  }, []);

  function Get() {
    fetch("https://25.15.67.98:7285/swagger/index.html")
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
                  <form onSubmit={function (event) {
        event.preventDefault();
        
        
      }}>
      <h4>itt tud új szavazást feladni!</h4>
      <p id='neve'><input type='text' id='title' placeholder='Szavazás címe'></input></p>
      <p id='kepe'><input type='text' id='description' placeholder='szavazás leírása'></input></p>

      <p id='gomb'><input type='submit'></input></p>
      </form>
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