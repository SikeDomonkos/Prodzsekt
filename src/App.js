import React from 'react';
import './App.css';
import Header from './header/Header';
import Card from './card/Card';
import Footer from './footer/Footer';
import Szavazas from './szavazas/Szavazas';
import { Route, Routes } from 'react-router-dom';
import Fooldal from './Fooldal/Fooldal';
import Bejelentkezes from './Bejelentkezes/Bejelentkezes';




function App() {
 

  return (

      <div className="App">
        <Header />
        
        <Routes>
           <Route path='/' element = {<Fooldal/>} />
           <Route path='/Segitsegkeres' element = {<Card/>} />
           <Route path='/Szavazas' element = {<Szavazas/>} />
           <Route path='/Bejelentkezes' element = {<Bejelentkezes/>} />
        </Routes>
            
        <Footer/>
      </div>
  );
}

export default App;
