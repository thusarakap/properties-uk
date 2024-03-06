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
  '/PropertyImages/prop1/prop1img1.jpeg',
  '/PropertyImages/prop1/prop1img2.jpeg',
  '/PropertyImages/prop1/prop1img3.jpeg',
  '/PropertyImages/prop1/prop1img5.jpeg',
  '/PropertyImages/prop1/prop1img6.jpeg',
  '/PropertyImages/prop1/prop1img7.jpeg',
  '/PropertyImages/prop1/prop1img8.jpeg',
];

const galleryItems = imagePaths.map((path) => ({
  original: path,
  thumbnail: path,
}));

const Prop1 = ({ addToFavorites }) => {
  const property = propertiesData.properties.find((prop) => prop.id === "prop1");

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
            <p>We are delighted to offer for sale this individually built and completely modernised 4 bedroom detached property located in a highly sought after area of Denmead. With views across local fields and a magnificent landscaped rear garden early interest is assured! The property boasts 4 double bedrooms over 2 floors, 3 bathroom suites, a large separate lounge, utility room, reception hall and a spectacular open plan kitchen and family room. Externally there is a large detached garage, further double length garage, considerable off road parking, a beautiful large landscaped rear garden and a fantastic detached out building which is currently used as a bar and has its own shower room, internet, heating and power. The property has a host of additional features including internal Oak doors, wired in speakers, new flooring etc and really needs to be seen internally to be fully appreciated.</p>
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
                    <img src="/PropertyImages/prop1/prop1floorplan.png" alt="Floor Plan" />
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
              src="https://www.google.com/maps/embed/v1/place?q=51.36839185159014,0.03851729103062801&key=AIzaSyChKti0n6LklHV_6yozYrh7gvW_G3aQJqM"
              allowFullScreen
            />
          </div>
        </TabPanel>

      </Tabs>

    </div>
  );
};

export default Prop1;
