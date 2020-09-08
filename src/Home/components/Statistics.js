import React, { FC, useEffect, useState } from 'react';


const Statistics = () => (
  <div className="steps landing__section">
    <div className="container">
      <h2>Our world leaves people feeling isolated and lonely.</h2>
      <p style={{fontSize: 20}}>
        More people are reporting feeling alone than ever before, often leading to serious
        health problems. We need a way to deal with our feelings
        of isolation, disconnection and dissatisfaction with life.
      </p>
    </div>
    <div className="container">
      <div className="steps__inner">
        <div className="step">
          <div className="step__media">
            <img src={require('../../assets/home/svg/empty.svg')} alt="empty" className="step__image" />
          </div>

          <p className="step__text" style={{ fontSize: 20, textAlign: 'center' }}>
            <strong>46%</strong>
            {' '}
            of U.S. adults report sometimes or always feeling lonely.
          </p>
        </div>
        <div className="step">
          <div className="step__media">
            <img src={require('../../assets/home/svg/grandma.svg')} alt="medical" className="step__image" />
          </div>
          <p className="step__text" style={{ fontSize: 20, textAlign: 'center' }}>
          Humans are <strong>wired</strong> for connection. 
          </p>
        </div>
        <div className="step">
          <div className="step__media">
            <img src={require('../../assets/home/svg/park.svg')} alt="park" className="step__image" />
          </div>
          <p className="step__text" style={{ fontSize: 20, textAlign: 'center' }}>
            Loneliness has similar health effects to smoking
            <strong> 15 cigarettes a day</strong>.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Statistics;
