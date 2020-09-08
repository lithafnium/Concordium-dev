import React, { useState } from 'react';
import Navbar from './Navbar'; 
import Tagline from './Tagline'; 


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  // Home, About, Team, Partners, Advisory Board, Contact Us, and Platform
  return (
    <div className = "main">
      <div className = "stripes">
        {/* <span className = "color1"></span>
        <span className = "color2"></span>
        <span className = "color3"></span>
        <span className = "color4"></span>
        <span className = "color5"></span> */}
      </div>
      <Navbar/>
      <Tagline/>
    </div>
  );
}

export default Header;