import React, { useState } from 'react';
import Header from './Header/Header';
import IngredientsList from './IngreidentsList/IngredientsList';
import Terminal from './Terminal/Terminal';
import Favourites from './Favourites/Favourites';
import Footer from './Footer/Footer';
import './App.css';

const App = () => {
    const [shawarmaOrder, setShawarmaOrder] = useState({
        main: "",
        toppings: [],
        sauces: [],
        spiciness: { level: 0, name: "Mild", color: "yellow"}
    });

    const [favourites, setFavourite] = useState([]);

    const addFanFav = (shawarmaOrder) => {
      if(favourites.length == 5){
        setFavourite([...favourites.slice(1), shawarmaOrder]);
      }else{
        setFavourite([...favourites, shawarmaOrder]);
      }
    };

    return (
        <div className="grid-container">
          <div className="grid-item">
            <Header />
          </div>
          <div className="grid-item">
            <Terminal shawarmaOrder={shawarmaOrder} />
          </div>
          <div className="grid-item">
            <IngredientsList shawarmaOrder={shawarmaOrder} setShawarmaOrder={setShawarmaOrder} setFavourite={addFanFav} />
          </div>
          <div className="grid-item">
            <Favourites favourites={favourites}/>
          </div>
          <div className="grid-item">
            <Footer/>
          </div>
        </div>
      );
}

export default App;