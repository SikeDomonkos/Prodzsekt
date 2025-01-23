import React from 'react'
import './Szavazas.css'

export default function Szavazas() {
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
                  <table>
                    
                    <h2>Szavazás</h2>
                    <h4 id='leiras'> Szavazás leírása</h4>
                    
                    <th>
                    
                        <tr>
                          <p id='igen'>Igen</p> <input type='checkbox' id='BtnIgen'></input>
                        
                        </tr>
                    </th>
                    
                    <th>
                        <tr>
                        
                          <p id='nem'>Nem</p> <input type='checkbox' id='BtnNem'></input>
                        </tr>
                        <input type='submit' id='kuldes'></input>
                    </th>

                    
                  </table>
              </div>

              
      </div>
  )
}

