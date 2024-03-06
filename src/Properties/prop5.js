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
  '/PropertyImages/prop5/prop5img1.jpeg',
  '/PropertyImages/prop5/prop5img2.jpeg',
  '/PropertyImages/prop5/prop5img3.jpeg',
  '/PropertyImages/prop5/prop5img5.jpeg',
  '/PropertyImages/prop5/prop5img6.jpeg',
  '/PropertyImages/prop5/prop5img7.jpeg',
  '/PropertyImages/prop5/prop5img8.jpeg',
];

const galleryItems = imagePaths.map((path) => ({
  original: path,
  thumbnail: path,
}));

const Prop5 = ({ addToFavorites }) => {
  const property = propertiesData.properties.find((prop) => prop.id === "prop5");

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
            <p>Arthington Hall is a classically designed Grade II listed Georgian house approached via a very discrete circular tree lined drive. At the gates to the property lies a Lodge House. The gardens and grounds have been beautifully landscaped to include a walled garden, parterre , orchard, courtyard and formal garden. Ample provision for car parking has been incorporated along with garaging for four cars, which was included in the recent renovation.<br></br>
            <br></br>
            The classic Georgian facade with nine windows across the front with a central pillared entrance leads onto a grand entrance hall some 23 ft. square, off which leads a number of the principal reception rooms.<br></br>
            <br></br>
            Originally built in the mid-15th century Arthington Hall stands on the site of a former Cluniac nunnery endowed by the Arthington family in the late 1200s and given by Henry VIII to Archbishop Cranmer in 1543 after the dissolution of the monasteries. Following a fire in the late 1700s the house was substantially remodelled for Henry Arthington by Yorkshire architect John Carr who was much in favour in Wharfedale at about that time designing such illustrious country houses, such as nearby Harewood house.<br></br>
            <br></br>
            At Arthington Hall Carr's most notable legacy is the famous 'flying staircase' described by the late Giles Wordsley (Country Life May 5, 1988) as a masterpiece of joinery and one of Yorkshire's unknown 18th century marvels. Set in an oval stairwell it starts with two flights that meet at the half landing to form a central unsupported flight.<br></br>
            <br></br>
            In 2015 Arthington Hall was beautifully and completely restored. Taking account of everyday detail to combine the splendor of the past history with modern, luxurious living.<br></br>
            <br></br>
            Gardens and grounds The gardens and grounds have been beautifully landscaped featuring new terracing and extensive planting. The principal terrace leading off the west wing is planted with a mixture of shrub and herbaceous borders with formal parterre and a hornbeam walk. A rose covered pergola leads to a terraced dining area with spectacular views towards the River Wharfe and the iconic Arthington viaduct.<br></br>
            <br></br>
            A new walled garden has been created and is capable of providing year-round produce as well as a picking garden for the household. Along with a large newly constructed traditional style greenhouse and appropriate storage behind, this garden is a remarkable feature even for a house of this stature.<br></br>
            <br></br>
            The Orangery being opposite a large family kitchen which is approached across a large terraced area with barbecue and seating this arrangement means a family can relax and enjoy all of the house without having to walk through many rooms.<br></br>
            <br></br>
            The grounds extend to approximately 22 acres which includes an ancient Beech and Bluebell wood with a Ha Ha wall that has been fully restored.<br></br>
            <br></br>
            In addition we are offering the shooting rights on a 20 year lease (17 years remaining) on the neighbouring 900 acres of land, this also includes the lease on the Bothy which is an ideal venue for shooting refreshments.<br></br>
            <br></br>
            There is the potential to put down between 5000 and 7000 poults and expect to shoot between five and nine days with an average bag of 250 birds. This is currently let out.</p>
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
                    <img src="/PropertyImages/prop5/prop5floorplan.png" alt="Floor Plan" />
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
              src="https://www.google.com/maps/embed/v1/place?q=53.90012900557415,-1.5850913835012719&key=AIzaSyChKti0n6LklHV_6yozYrh7gvW_G3aQJqM"
              allowFullScreen
            />
          </div>
        </TabPanel>

      </Tabs>

    </div>
  );
};

export default Prop5;
