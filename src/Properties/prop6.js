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
  '/PropertyImages/prop6/prop6img1.jpeg',
  '/PropertyImages/prop6/prop6img2.jpeg',
  '/PropertyImages/prop6/prop6img3.jpeg',
  '/PropertyImages/prop6/prop6img5.jpeg',
  '/PropertyImages/prop6/prop6img6.jpeg',
  '/PropertyImages/prop6/prop6img7.jpeg',
  '/PropertyImages/prop6/prop6img8.jpeg',
];

const galleryItems = imagePaths.map((path) => ({
  original: path,
  thumbnail: path,
}));

const Prop6 = ({ addToFavorites }) => {
  const property = propertiesData.properties.find((prop) => prop.id === "prop6");

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
            <p>We are delighted to offer for sale this individually built and completely modernised 4 bedroom detached property located in a highly sought after area of Denmead. With views across local fields and a magnificent landscaped rear garden early interest is assured! The property boasts 4 double bedrooms over 2 floors, 3 bathroom suites, a large separate lounge, utility room, reception hall and a spectacular open plan kitchen and family room. Externally there is a large detached garage, further double length garage, considerable off road parking, a beautiful large landscaped rear garden and a fantastic detached out building which is currently used as a bar and has its own shower room, internet, heating and power. The property has a host of additional features including internal Oak doors, wired in speakers, new flooring etc and really needs to be seen internally to be fully appreciated. Contact us as sole agents today.<br></br>
            <br></br>
            RECEPTION HALL Matching Oak effect composite double glazed door and window to front aspect, 2 radiators, LED spotlights, engineered Oak flooring, stairs to first floor, Oak doors to: <br></br>
            <br></br>
            BEDROOM 4/RECEPTION ROOM 12' 08" x 11' 05" (3.86m x 3.48m) Window to front aspect, radiator, services cupboard including internet, CAT 5 connections, meters. <br></br>
            <br></br>
            LOUNGE 21' 01" x 14' 10" (6.43m x 4.52m) Window to front aspect, radiator. <br></br>
            <br></br>
            BATHROOM 10' 02" x 9' 03" (3.1m x 2.82m) Window to side aspect, floor to ceiling wall radiator, panelled bath, shower cubicle, hand wash basin with vanity surround and drawers under, WC, built in TV, extractor, LED spotlights, electric wall mirror. <br></br>
            <br></br>
            UTILITY ROOM 9' 11" x 5' 08" (3.02m x 1.73m) Door to side aspect, radiator, range of cupboards, units and work surfaces, plumbing for washing machine, space for tumble dryer, cupboard housing boiler, LED spot lighting. <br></br>
            <br></br>
            KITCHEN/FAMILY ROOM 33' 10" x 21' (10.31m x 6.4m) Windows and bi-fold doors to rear garden, window to side aspect, twin 'lantern' style roof windows, radiator, floor to ceiling radiator, log burner with brick surround and hearth, wired in speakers, LED spotlights, range of fitted cupboards, units and work surfaces with inset sink unit and mixer tap over, integrated dishwasher, space for 'American' style fridge freezer, space for 'Range' style cooker with extractor over, breakfast bar, part tiled flooring.  <br></br>
            <br></br>
            FIRST FLOOR Landing - Sky light window to front aspect, radiator, LED spotlights, doors to: <br></br>
            <br></br>
            BEDROOM 1 17' 04" x 12' (5.28m x 3.66m) Window to rear aspect, radiator, wired in speakers, door to: <br></br>
            <br></br>
            ENSUITE 12' x 7' 02" (3.66m x 2.18m) Twin Velux windows to front aspect, radiator, heated towel rail, double shower, WC, hand wash basin with vanity surround and drawers under, LED spotlights, extractor. <br></br>
            <br></br>
            BEDROOM 2 15' 04 max" x 14 max' (4.67m x 4.27m) Window to front aspect, radiator, eaves storage. <br></br>
            <br></br>
            BEDROOM 3 12' 10" x 12' 09" (3.91m x 3.89m) Window to front aspect, radiator. <br></br>
            <br></br>
            BATHROOM 8' 04" x 6' 06" (2.54m x 1.98m) Window to rear aspect, heated towel rail, shower, WC, hand wash basin with vanity surround and drawers under, LED spotlights, extractor, fully tiled. <br></br>
            <br></br>
            OUTSIDE Front - Lawned area, outside lighting, power points, large driveway leading to 2 garages, gated side pedestrian access to rear garden. <br></br>
            <br></br>
            GARAGE 19' 10" x 13' 07" (6.05m x 4.14m) Electric roller door, light and power points, roof void storage, sensor lighting. <br></br>
            <br></br>
            DOUBLE GARAGE 27' 5" x 8' 06" (8.36m x 2.59m) Double length garage with double doors to the front, light and power, personal door to rear garden. <br></br>
            <br></br>
            REAR GARDEN Large landscaped rear garden with large lawned area and extensive 'Indian Sandstone' patio area, array of mature plants, shrubs and trees, outside tap, lighting, sensor lighting, multiple power points, security cameras, twin gated side access, covered BBQ area with own light and power, wood store, area with fruit trees. <br></br>
            <br></br>
            OUTBUILDING/BAR 21' 10" x 18' 01" (6.65m x 5.51m) Window to side aspect, skylight window, sliding doors to front, air conditioning unit providing warm and cool air, own power and internet systems, hard wiring for TV & speakers, light and power points externally, cupboard housing all services, door to: <br></br>
            <br></br>
            SHOWER ROOM 6' 09" x 6' 05" (2.06m x 1.96m) Windows to front aspect, shower cubicle, WC, hand wash basin with vanity surround and drawers under. </p>
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
                    <img src="/PropertyImages/prop6/prop6floorplan.png" alt="Floor Plan" />
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
              src="https://www.google.com/maps/embed/v1/place?q=50.904433316136235,-1.0738190800188738&key=AIzaSyChKti0n6LklHV_6yozYrh7gvW_G3aQJqM"
              allowFullScreen
            />
          </div>
        </TabPanel>

      </Tabs>

    </div>
  );
};

export default Prop6;
