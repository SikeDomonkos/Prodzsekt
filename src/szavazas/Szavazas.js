import React from 'react'
import './Szavazas.css'

export default function Szavazas() {
  return (
          <div className='szavaz'>
              <table>
                
                <h2>Szavazás</h2>
                <h3 id='leiras'> Szavazás leírása</h3>
                
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
  )
}

