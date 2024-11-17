import React from 'react';
import './App.css';
import Header from './header/Header';
import Body from './body/Body';
import Card from './card/Card';
import Footer from './footer/Footer';
import Szavazas from './szavazas/Szavazas';




function App() {
 

  return (

      <div className="App">
        <Header />
       
        <Body/>
       
        <Card/>

       <Footer/>

       <Szavazas/>
        
        
      </div>
  );
}

export default App;
