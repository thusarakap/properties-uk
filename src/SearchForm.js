import React, { useState } from 'react';
import { Combobox, DateTimePicker} from 'react-widgets';
import 'react-widgets/styles.css';
import './SearchForm.css';
import { postcodes } from './Constants';
import { months } from './Constants';
import { prices } from './Constants';
import { noBedrooms } from './Constants';
import { propertyTypes } from './Constants';
import { Link } from 'react-router-dom';


const SearchForm = ({ properties}) => {

  //Search criteria
  const [searchCriteria, setSearchCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAdded: null,
    postcodeArea: '',
  });

  const [searchResults, setSearchResults] = useState(properties);
  
  //Search function
  const handleSearch = () => {
    const filteredResults = properties.filter((property) => {
      // Search logic
      return (
        (searchCriteria.type === '' || property.type.toLowerCase() === searchCriteria.type.toLowerCase()) &&
        (searchCriteria.minPrice === '' || property.price >= parseInt(searchCriteria.minPrice, 10)) &&
        (searchCriteria.maxPrice === '' || property.price <= parseInt(searchCriteria.maxPrice, 10)) &&
        (searchCriteria.minBedrooms === '' || property.bedrooms >= parseInt(searchCriteria.minBedrooms, 10)) &&
        (searchCriteria.maxBedrooms === '' || property.bedrooms <= parseInt(searchCriteria.maxBedrooms, 10)) &&
        (searchCriteria.dateAdded === null || new Date(property.added.year, months.indexOf(property.added.month), property.added.day) >= new Date(searchCriteria.dateAdded)) &&
        (searchCriteria.postcodeArea === '' || property.postcodeArea.toLowerCase().includes(searchCriteria.postcodeArea.toLowerCase()))
      );
    });
    //Update search results list
    setSearchResults(filteredResults);
  };

  return (
    <div className="container">
        <form className="form">
        {/*Property type*/}
        <Combobox
            data={propertyTypes}
            placeholder={searchCriteria.type === '' ? 'Property Type' : undefined}
            value={searchCriteria.type}
            onChange={(value) => setSearchCriteria({ ...searchCriteria, type: value })}
        />
        
        {/*Min to max price prices*/}
        <Combobox
            data={prices}
            placeholder={searchCriteria.minPrice === '' ? 'Min Price' : undefined}
            value={searchCriteria.minPrice}
            onChange={(value) => setSearchCriteria({ ...searchCriteria, minPrice: value })}
        />

        <label>to</label> 
        
        <Combobox
            data={prices}
          placeholder={searchCriteria.maxPrice === '' ? 'Max Price' : undefined}
          value={searchCriteria.maxPrice}
          onChange={(value) => setSearchCriteria({ ...searchCriteria, maxPrice: value })}
        />
        
        {/*Min to max no. of bedrooms*/}
        <Combobox
            data={noBedrooms}
            placeholder={searchCriteria.minBedrooms === '' ? 'Min Bedrooms' : undefined}
            value={searchCriteria.minBedrooms}
            onChange={(value) => setSearchCriteria({ ...searchCriteria, minBedrooms: value })}
        />

        <Combobox
            data={noBedrooms}
            placeholder={searchCriteria.maxBedrooms === '' ? 'Max Bedrooms' : undefined}
            value={searchCriteria.maxBedrooms}
            onChange={(value) => setSearchCriteria({ ...searchCriteria, maxBedrooms: value })}
        />

        {/*Date listing was added*/}
        <DateTimePicker
            format="MM/DD/YYYY"
            placeholder={searchCriteria.dateAdded === null ? 'Date Added' : undefined}
            value={searchCriteria.dateAdded === '' ? 'Date Added' : searchCriteria.dateAdded}
            onChange={(value) => setSearchCriteria({ ...searchCriteria, dateAdded: value })}
        />

        {/*Search by postcode*/}
        <Combobox
            data={postcodes}
            placeholder={searchCriteria.postcodeArea === '' ? 'Postcode Area' : undefined}
            value={searchCriteria.postcodeArea}
            onChange={(value) => setSearchCriteria({ ...searchCriteria, postcodeArea: value })}
        />
        
        {/*Search button*/}
        <button type="button" onClick={handleSearch}>
            Search
        </button>

        </form>

        {/*List of results*/}
        <div className="resultsContainer">
            <h2>Results</h2>
            <ul>
            {searchResults.map((property) => (
                <li key={property.id}>
                <div className='imgPriceContainer'>
                  <img src={property.picture} alt={property.img} />
                  <div className='priceContainer'>
                    <p>Price: £{property.price}</p>
                  </div>
                </div>
                <div>
                  <p className='location'>{property.location}</p>
                  <p className='type'>{property.type} - {property.bedrooms} bedrooms</p>
                  <p className='description'>{property.description}</p>
                  <Link to={property.url}>View Property</Link>
                </div>
                </li>
            ))}
            </ul>
        </div>
    </div>
  );
};

export default SearchForm;
