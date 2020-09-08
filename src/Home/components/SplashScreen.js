import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import headerpic from '../../assets/frends.svg';


// const SplashScreen = () => (
//   <div className="hero">
//     <div className="hero__overlay hero__overlay--gradient" />
//     <div className="hero__mask" />
//     <div className="hero__inner">
//       <div className="container" style={{ width: '100%' }}>
//         <div className="hero__content" style={{ display: 'flex', width: '90vh', flexWrap: 'wrap' }}>
//           <div className="hero__content__inner" id="navConverter" style={{ width: '40%' }}>
//             <h1 className="hero__title" style={{ fontSize: 40 }}>The Concordium</h1>
//             <p className="hero__text">Harvard-incubated organization, leveraging video conferencing to eradicate social isolation in the aging population.</p>
//             <a href="/" className="button button__accent">Get Started</a>
//             <a href="/" className="button hero__button">Learn more</a>
//           </div>
//
//           <img
//             style={{
//               width: '50%',
//               border: '15px solid green',
//               padding: '50px',
//               margin: '20px',
//             }}
//             src={headerpic}
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );

const SplashScreen = () => (
  <div className="tool" style={{ backgroundColor: '#a51c30' }}>
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
            <button style={{ backgroundColor: '#30a61d', borderColor: '#30a61d', padding: '15px 40px 15px 40px' }} onClick={() => window.location.href = '/donate'}>Donate</button>
          </Link>
        </div>
        <div className="videoImage">
          <img src={headerpic} />
        </div>
      </div>

    </div>
  </div>
);

export default SplashScreen;
