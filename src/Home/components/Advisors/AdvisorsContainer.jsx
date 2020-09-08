import React, { FC, useEffect, useState } from 'react';
import Advisors from './Advisors';


const AdvisorsContainer = () => (
  <div className="cta cta--reverse" style={{ backgroundColor: '#eee' }}>
    <div className="container">
      <div className="cta__inner">
        <Advisors />
      </div>
    </div>
  </div>
);
export default AdvisorsContainer;
