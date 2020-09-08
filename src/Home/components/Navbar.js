import React, { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';


const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [top, setTop] = useState(false);
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY > 100;
      if (isTop !== top) {
        setTop(isTop);
      }
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1200) {
        setSlide(false);
      }
    });
  });

  console.log(slide);


  const toggle = () => setIsOpen(!isOpen);
  // Home, About, Team, Partners, Advisory Board, Contact Us, and Platform
  return (

    <div>
      <div className={`navbar-container ${top ? 'background-nav' : null}`}>

        <div className="navbar">
          <div className="brand">

            <a
              href="/"

              spy
              smooth
              offset={-70}
              duration={500}
            >
              <h1 style={{
                position: 'absolute', color: 'white', zIndex: 30, top: 0, left: '10%',
              }}
              >
                the concordium
              </h1>
            </a>
            {/* <img src = "/Untitled-1.png"/> */}
            {/* <img src = "/concordium-01.svg"/>
                <h1>Concordium</h1> */}

          </div>
          <div className="menu">
            <a
              href="/about"
              className="nav-item"
            >
              About
            </a>
            <a
              href="/team"
              className="nav-item"
            >
              Team
            </a>
            <a
              href="/advisors"
              className="nav-item"

            >
              Advisory Board
            </a>
            {/* <a className = "nav-item">Partners</a> */}
            <a className="nav-item" href="/contact">Contact Us</a>
            <button className="nav-item" style={{ backgroundColor: '#cacaca', borderColor: '#cacaca' }} onClick={() => window.location.href = '/login'} className="login"><span style={{ color: 'black' }}>Log In</span></button>
          </div>
          <div className={`hamburger ${slide ? 'shift' : null}`} onClick={() => setSlide(!slide)}>
            <p className={`${'bar ' + 'bar1 '}${slide ? 'rotate1' : null}`} />
            <p className={`${'bar ' + 'bar2 '}${slide ? 'rotate2' : null}`} />
            <p className={`${'bar ' + 'bar3 '}${slide ? 'rotate3' : null}`} />
          </div>

        </div>

      </div>
      <div style={{ justify: 'center', alignItems: 'center' }} className={`navsidebar ${slide ? 'showsidenav' : null}`}>
        <button
          style={{
            borderRadius: 0, borderWidth: 0, position: 'absolute', top: 5, left: 5,
          }}
          onClick={() => setSlide(false)}
        >
          <p className={`${'bar ' + 'bar1 '}${slide ? 'rotate1' : null}`} />
          <p className={`${'bar ' + 'bar2 '}${slide ? 'rotate2' : null}`} />
          <p className={`${'bar ' + 'bar3 '}${slide ? 'rotate3' : null}`} />
        </button>
        <a
          href="/about"
          className="nav-item"
        >
          About
        </a>
        <a
          href="/team"
          className="nav-item"
        >
          Team
        </a>
        <a
          href="/advisors"
          className="nav-item"
        >
          Advisory Board
        </a>
        <a href="/contact" className="nav-item">Contact Us</a>
        <button type="submit" className="nav item" onClick={() => window.location.href = '/login'} className="login">Log in</button>
      </div>
    </div>
  );
};

export default Navbar;
