import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './Header';
import Footer from './Footer';
import SearchForm from './SearchForm';
import FavoritesList from './FavoritesList';
import propertiesData from './properties.json';
import Prop1 from './Properties/prop1';
import Prop2 from './Properties/prop2';
import Prop3 from './Properties/prop3';
import Prop4 from './Properties/prop4';
import Prop5 from './Properties/prop5';
import Prop6 from './Properties/prop6';
import Prop7 from './Properties/prop7';
import './Layout.css';

const App = () => {
  const [favorites, setFavorites] = useState([]);

  //Add to favorites list logic
  const addToFavorites = (property) => {
    if (!favorites.find((fav) => fav.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  //Remove from favorites list logic 
  const removeFromFavorites = (propertyId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== propertyId);
    setFavorites(updatedFavorites);
  };

  //Clear favorites list logic
  const clearFavorites = () => {
    setFavorites([]);
  };  

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <div className='mainContainer'>
          <Header />
          <div className='mainLayout'>
          <FavoritesList
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
              addToFavorites={addToFavorites}
              clearFavorites={clearFavorites}
            />

            <Routes>
              <Route path="/" element={<SearchForm properties={propertiesData.properties} />} />
              <Route path="/Properties/prop1" element={<Prop1 addToFavorites={addToFavorites} />} />
              <Route path="/Properties/prop2" element={<Prop2 addToFavorites={addToFavorites} />} />
              <Route path="/Properties/prop3" element={<Prop3 addToFavorites={addToFavorites} />} />
              <Route path="/Properties/prop4" element={<Prop4 addToFavorites={addToFavorites} />} />
              <Route path="/Properties/prop5" element={<Prop5 addToFavorites={addToFavorites} />} />
              <Route path="/Properties/prop6" element={<Prop6 addToFavorites={addToFavorites} />} />
              <Route path="/Properties/prop7" element={<Prop7 addToFavorites={addToFavorites} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </DndProvider>
    </Router>
  );
};

export default App;
