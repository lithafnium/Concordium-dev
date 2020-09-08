import React, { FC, useEffect, useState } from 'react';


const Informational = () => (
  <>
    <div className="expanded landing__section">
      <div className="container">
        <div className="expanded__inner">
          <div className="expanded__media">
            <img src={require('../../assets/home/svg/hello.svg')} alt="hello" className="expanded__image" />
          </div>
          <div className="expanded__content">
            <h2 className="expanded__title" style={{fontSize: 35, marginTop: -30}}>Conversation is therapeutic beyond measure.</h2>
            <p align="justify" className="expanded__text" style={{fontSize: 15}}>Together, we have the tools to combat social isolation. Conversation and video conferencing have been shown to be the most powerful tool to combat social isolation. The Concordium translates this modern approach from journals to practice, while harnessing an intergenerational approach.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="expanded landing__section">
      <div className="container">
        <div className="expanded__inner">
          <div className="expanded__media">
            <img src={require('../../assets/home/connect.svg')} alt="connect" className="expanded__image" />
          </div>
          <div className="expanded__content">
            <h2 className="expanded__title" style={{fontSize: 35, marginTop: -30}}>Let's combat loneliness together. </h2>
            <p className="expanded__text" style={{fontSize: 15}}>Our tool collects basic information about a user’s experiences and interests, matching individuals among different generations to have regular, 30-minute to one-hour long conversations.

            </p>
          </div>
        </div>
      </div>
    </div>
    {/* <div className="expanded landing__section">
      <div className="container">
        <div className="expanded__inner">
          <div className="expanded__media">
            <img src={require('../../assets/home/videocall.svg')} alt="videocall" className="expanded__image" />
          </div>
          <div className="expanded__content">
            <h2 className="expanded__title">Designed with seniors in mind</h2>
            <p className="expanded__text">The platform’s interface has been specifically designed for seniors to use, with easy graphics and controls. Conversation, and video conferencing, has been shown to be the most powerful tool to combat isolation; we’ve seen this in our own research at Harvard. Our tool translates this modern approach from journals to practice.</p>
          </div>
        </div>
      </div>
    </div> */}
  </>
);

export default Informational;
