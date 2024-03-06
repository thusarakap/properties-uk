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
  '/PropertyImages/prop4/prop4img1.jpeg',
  '/PropertyImages/prop4/prop4img2.jpeg',
  '/PropertyImages/prop4/prop4img3.jpeg',
  '/PropertyImages/prop4/prop4img5.jpeg',
  '/PropertyImages/prop4/prop4img6.jpeg',
  '/PropertyImages/prop4/prop4img7.jpeg',
  '/PropertyImages/prop4/prop4img8.jpeg',
];

const galleryItems = imagePaths.map((path) => ({
  original: path,
  thumbnail: path,
}));

const Prop4 = ({ addToFavorites }) => {
  const property = propertiesData.properties.find((prop) => prop.id === "prop4");

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
            <p>Daisy Lake is a wonderful imposing property which was built in 1968 to replicate a Georgian country house. Set in lovely grounds extending to just over 8.5 acres, the house was built to appreciate the glorious surroundings and was designed to afford maximum benefit of not only the beautiful gardens and grounds but to allow in plenty of natural light. The house offers all of this with decorative cornicing and wonderful room proportions whilst in its beautiful setting and grounds.<br></br>
            <br></br>
            A fine classic Georgian portico with Balustrade, covers the front door which opens into the grand entrance hall with the decorative staircase, plenty of natural light and a chequered tiled floor with a chess board. Double doors lead into the triple aspect drawing room, with a Chesney woodburning stove and a decorative surround with a marble hearth. Views look towards the lake and gardens. The formal dining room offers views over the front of the house and has a working open fireplace.<br></br>
            <br></br>
            The kitchen breakfast room offers a fantastic space with double doors leading outside onto the terrace, with a home office space. The kitchen was designed by Kenton Jones in 2005 and has a vast range of units and drawers with granite worktops, integrated microwave, fridge, freezer and dishwasher. There is a central island with power points, a boiling water tap and an electric 4 oven AGA.<br></br>
            <br></br>
            The morning room may be accessed via the entrance hall and the kitchen and has doors out onto the terrace which attracts the morning sun. This room could ideally serve as a play room or family room. The utility room & laundry has space for a washing machine and dryer with doors leading outside to the terrace. The triple garage may be accessed via a fire door from the utility room.<br></br>
            <br></br>
            The decorative staircase glides up to the first floor and a minstrel galleried landing which offers a space for a home office or potentially a fifth bedroom. The principal bedroom has views over the lake, with a separate dressing room and an en suite shower with twin vanity sink. There are a further 3 double bedrooms, all with lovely views and built in wardrobes and a separate family bathroom with a bath and separate shower.</p>
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
                    <img src="/PropertyImages/prop4/prop4floorplan.png" alt="Floor Plan" />
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
              src="https://www.google.com/maps/embed/v1/place?q=52.918215933213276,-2.435163323648252&key=AIzaSyChKti0n6LklHV_6yozYrh7gvW_G3aQJqM"
              allowFullScreen
            />
          </div>
        </TabPanel>

      </Tabs>

    </div>
  );
};

export default Prop4;
