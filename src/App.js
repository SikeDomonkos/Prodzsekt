import React from 'react';
import './App.css';
import Header from './header/Header';
import Footer from './footer/Footer';
import Szavazas from './szavazas/Szavazas';
import { Route, Routes } from 'react-router-dom';
import Fooldal from './Fooldal/Fooldal';
import Bejelentkezes from './Bejelentkezes/Bejelentkezes';
import Help from './card/Help';
import Profilom from './Profilom/Profilom';




function App() {
 

  return (

      <div className="App">
        <Header />
        
        <Routes>
           <Route path='/' element = {<Fooldal/>} />
           <Route path='/Segitsegkeres' element = {<Help/>} />
           <Route path='/Szavazas' element = {<Szavazas/>} />
           <Route path='/Bejelentkezes' element = {<Bejelentkezes/>} />
           <Route path='/Profilom' element = {<Profilom/>} />
        </Routes>
            
        <Footer/>
      </div>
  );
}

export default App;
