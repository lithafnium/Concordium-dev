import React, { FC, useState, useEffect } from 'react';


const Footer = () => (
  <div className="footer footer--dark">
    <div className="container">
      <div className="footer__inner">
<a href="index.html" className="footer__textLogo">Copyright <i>The Concordium {new Date().getFullYear()}</i></a>
        <div className="footer__data" />
      </div>
    </div>
  </div>
);

export default Footer;
