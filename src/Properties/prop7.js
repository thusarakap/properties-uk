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
  '/PropertyImages/prop7/prop7img1.jpeg',
  '/PropertyImages/prop7/prop7img2.jpeg',
  '/PropertyImages/prop7/prop7img3.jpeg',
  '/PropertyImages/prop7/prop7img5.jpeg',
  '/PropertyImages/prop7/prop7img6.jpeg',
  '/PropertyImages/prop7/prop7img7.jpeg',
  '/PropertyImages/prop7/prop7img8.jpeg',
];

const galleryItems = imagePaths.map((path) => ({
  original: path,
  thumbnail: path,
}));

const Prop7 = ({ addToFavorites }) => {
  const property = propertiesData.properties.find((prop) => prop.id === "prop7");

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
            <p> Brand new to market is this extended three-bedroom semi-detached house, located in the highly sought after residential area of Gleadless.<br></br>
            <br></br>
            Benefitting from easy access to a range of amenities including primary and secondary schools, shops, and transport links. Perfect for first time buyer/s, couples or families.
            This property features a kitchen diner, living room, utility room, three bedrooms, bathroom, well-maintained rear garden with driveway & garage.
            Offered for sale with the benefits of gas central heating, uPVC double glazing with NO ONWARD CHAIN.<br></br>
            <br></br>
            ***A VIEWING IS HIGHLY RECOMMENDED***<br></br>
            <br></br>
            Briefly the property comprises of:-
            The main entrance to the property into the hall offers access to the ground and first floor living accommodation.
            From the hallway into the spacious living room, overlooking the front of the property and surrounding neighbourhood.
            A kitchen diner with wall and base units, freestanding electric oven and hob. In addition is a utility room, also offering access to the enclosed rear garden.<br></br>
            <br></br>
            The first floor landing leads to three spacious bedrooms and bathroom. Bedroom one is a spacious double featuring fitted wardrobes.
            Bedroom two is also a double, again featuring fitted wardrobes.
            Bedroom three is a single or can be used as an office.
            Finally a three piece bathroom with overhead shower, wash basin & WC.<br></br>
            <br></br>
            Externally: The front of the property is a driveway and garage with the addition of on-street parking.
            The rear of the property is a well-maintained garden with lawn and shrubbery, with the added benefit of an outhouse for additional storage.<br></br>
            <br></br>
            Gleadless is a highly sought after residential area and offers superb local amenities; including shops, primary & secondary schools and public transport links.
            Ideally placed for links to both the M1 motorway networks and access to Sheffield City Centre.</p>
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
                    <img src="/PropertyImages/prop7/prop7floorplan.png" alt="Floor Plan" />
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
              src="https://www.google.com/maps/embed/v1/place?q=53.34476061867576,-1.4217166357033597&key=AIzaSyChKti0n6LklHV_6yozYrh7gvW_G3aQJqM"
              allowFullScreen
            />
          </div>
        </TabPanel>

      </Tabs>

    </div>
  );
};

export default Prop7;
