import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import the default styles
import propertiesData from '../properties.json';
import '../PropertyPageStyles.css';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../Constants';
import Gallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const imagePaths = [
  '/PropertyImages/prop3/prop3img1.jpeg',
  '/PropertyImages/prop3/prop3img2.jpeg',
  '/PropertyImages/prop3/prop3img3.jpeg',
  '/PropertyImages/prop3/prop3img5.jpeg',
  '/PropertyImages/prop3/prop3img6.jpeg',
  '/PropertyImages/prop3/prop3img7.jpeg',
  '/PropertyImages/prop3/prop3img8.jpeg',
];

const galleryItems = imagePaths.map((path) => ({
  original: path,
  thumbnail: path,
}));

const Prop3 = ({ addToFavorites }) => {
  const property = propertiesData.properties.find((prop) => prop.id === "prop3");

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.PROPERTY,
    item: { property },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const containerStyle = {
    opacity: isDragging ? 1 : 1,
    cursor: 'move',
    border: isDragging ? '3px solid red' : '4px solid #AAB0BD',
    transition: 'border 0.8s ease',
  };

  return (
    <div className="propertyListing" ref={drag} style={containerStyle}>
      <div className="propertyGallery">
        <Gallery
            items={galleryItems}
            showFullscreenButton={false}
            showPlayButton={false}
          />
      </div>

      <div className="propertyDetailsContainer">
        <div className="propertyDetails">
          <h1>{property.location}</h1>
          <h2>Type: {property.type} | Bedrooms: {property.bedrooms} | Tenure: {property.tenure}  </h2>
          <p>Price: <span className="price">£{property.price}</span></p>
          <p>Tenure: {property.tenure}</p>
          <p>Location: {property.location}</p>
          <p>Added: {property.added.month} {property.added.day}, {property.added.year}</p>
        </div>
        <button className="addToFavoritesButton" onClick={() => addToFavorites(property)}>
          <FontAwesomeIcon icon={faHeart} />
          <span>Add to Favorites</span>
        </button>
      </div>

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="propertyDescription">
            <h1>Property Description</h1>
            <p>Langford Russell are pleased to present this spacious, two bedroom end of terrace home located close to a number of local amenities and transport links.<br></br><br></br>
            The property boasts entrance hall, neutral lounge/diner with original fireplace, newly fitted kitchen and two storage cupboards to the ground floor. Whereas upstairs comprises two double bedrooms with fitted wardrobes, newly fitted bathroom and separate W.C.<br></br>
            Externally the property boasts a large garden with patio area and front garden. Further benefits include double glazing, gas central heating, recently rewired and also offers great potential to extend.<br></br>
            <br></br>Situated close to St Mary Cray station with fast links to London, a number of local schools including well regarded Midfield Primary School and local amenities including the Nugent centre.<br></br>
            <br></br>Energy Efficiency Rating D |LONDON BOROUGH OF BROMLEY <br></br><br></br>Tax Band C</p>
        </div>
        </TabPanel>

        <TabPanel>
          <div className='floorPlan'>
            <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                  <div className="tools">
                    <button onClick={() => zoomIn()}>+</button>
                    <button onClick={() => zoomOut()}>-</button>
                    <button onClick={() => resetTransform()}>x</button>
                  </div>
                  <TransformComponent>
                    <img src="/PropertyImages/prop3/prop3floorplan.png" alt="Floor Plan" />
                    <div>Floor Plan</div>
                  </TransformComponent>
                </React.Fragment>
              )}
          </TransformWrapper>
        </div>
        </TabPanel>
          
        <TabPanel>
          <div className="Map">
            <iframe
              title="Google Maps Embed"
              src="https://www.google.com/maps/embed/v1/place?q=51.40145658822045,0.09551480123743844&key=AIzaSyChKti0n6LklHV_6yozYrh7gvW_G3aQJqM"
              allowFullScreen
            />
          </div>
        </TabPanel>

      </Tabs>
    </div>
  );
};

export default Prop3;
