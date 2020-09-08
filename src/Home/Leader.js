import React from 'react';
import { FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Leader = ({
  name, role, imgsrc, url, leader,
}) => (
  <div className="leader">
    <div className="leaderpic" style={{ borderRadius: 10 }}>
      <img style={{ borderRadius: 10 }} src={imgsrc} />
      {!leader && (
      <a href={url}>
        <div className="leaderhover">

          <IconContext.Provider value={{ size: '3em' }}>
            <div>
              <FaExternalLinkAlt />

            </div>
          </IconContext.Provider>


        </div>

      </a>
      )}


    </div>
    <h3 className="name">{name}</h3>
    <p style={{ color: 'black' }}>{role}</p>
  </div>
);

export default Leader;
