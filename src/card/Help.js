import React from 'react';
import './Help.css';

function Help() {

//Ez lesz majd a Post
  return (

    <div className='Fo'>
      <div className="card">
        <h2>Segítség kérése</h2>
        <p>írja le miben kell segíteni!</p> <input type='text'></input>
        <p>Válassza ki a napot amikor várja a segítséget!</p> <input type='date'></input>
        <input type='submit'></input>
      </div>
      </div>
 
  );
}

export default Help;