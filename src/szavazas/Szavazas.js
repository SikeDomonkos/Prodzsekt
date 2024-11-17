import React from 'react'
import './Szavazas.css'

export default function Szavazas() {
  return (
    <div className='szavaz'>
      <h2>Szavazás</h2>
      <h3>Szavazás leírása</h3>
      
      <p id='igen'>Igen</p> <input type='checkbox'></input>
      <p id='nem'>Nem</p> <input type='checkbox'></input>
      <input type='submit' id='kuldes'></input>
    </div>
  )
}

