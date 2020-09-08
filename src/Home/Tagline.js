import React, { useState } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import headerpic from './frends.svg';

const Tagline = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slide, setSlide] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  // Home, About, Team, Partners, Advisory Board, Contact Us, and Platform
  return (
    <div id="home" className="main-container">
      <div className="tagline">
        <div className="heading">
          <h1>Alleviating social isolation together.</h1>
          <p>Harvard-incubated organization, leveraging video conferencing and intergenerational relationships to eradicate the loneliness epidemic.</p>
          <Link
            to="about"
            spy
            smooth
            offset={-70}
            duration={500}
          >
            <button className="learnmore">Learn More</button>
          </Link>
        </div>
        <div className="videoImage">
          <img src={headerpic} />
        </div>
      </div>

    </div>
  );
};

export default Tagline;
