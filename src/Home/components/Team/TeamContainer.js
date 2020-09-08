import React, { FC, useEffect, useState } from 'react';
import Team from './Team';


const TeamContainer = () => (
  <div className="cta cta--reverse" style={{ backgroundColor: '#fff' }}>
    <div className="container">
      <div className="cta__inner">
        <Team />
      </div>
    </div>
  </div>
);


export default TeamContainer;
