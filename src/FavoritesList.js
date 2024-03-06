import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from './Constants';
import './FavoritesList.css';
import { Link } from 'react-router-dom';


//Make items draggable to add to favourites list
const FavoritesList = ({ favorites, removeFromFavorites, addToFavorites, clearFavorites }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PROPERTY,
    drop: (item) => {
      addToFavorites(item.property);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  //Favourites list
  return (
    <div ref={drop} className={`favoritesList ${isOver ? 'over' : ''}`}>
      <h3>Favorites</h3>
      {favorites.length > 0 && (
        <div className="clearAllButtonContainer">
          <button className="clearAllButton" onClick={clearFavorites}>
            Clear All
          </button>
        </div>
      )}
      <ul>
        {favorites.map((property) => (
          <DraggableProperty
            key={property.id}
            property={property}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </ul>
    </div>
  );
};

//Make list item draggable
const DraggableProperty = ({ property, removeFromFavorites }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PROPERTY,
    item: { type: ItemTypes.PROPERTY, property: property },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        removeFromFavorites(item.property.id);
      }
    },
  });

  //Favourite List Item
  return (
    <li ref={drag}>
      <div>
        <p className='favItemHeading'>{property.type} - {property.bedrooms} bedrooms{' '}</p>
        <img src={property.picture} alt={property.img} />
        <div className='favListButtons'>
          <Link to={property.url}>
            <button className='viewPropButton'>
              View
            </button>
          </Link>
          <button className='removeFavItemButton' onClick={() => removeFromFavorites(property.id)}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default FavoritesList;
