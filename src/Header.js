// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './Layout.css'; 

const Header = () => {
  return (
    <div class="header">
      <Link to="/" class="name">Properties.co.uk</Link>
      <div class="headerRight">
        <Link to="/" class="linkButton">Home</Link>
      </div>
    </div>
  );
};

export default Header;
