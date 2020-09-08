import React, { useState } from 'react';
import {
  MdPerson,
  MdVideocam,
} from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import firebase from 'firebase/app';
import Sidebar from './Sidebar';
import Profile from './Profile';
import Header from '../Header';
import Video from '../Video/Video';

require('firebase/auth');
require('firebase/storage');

function Main(props) {
  const [showProfile, toggleView] = useState(true);
  const [name, setName] = useState('');

  function toggle(view) {
    toggleView(view);
  }

  function signout() {
    firebase.auth().signOut().then(() => {
      window.location.href = '/login';
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <div className="tool">
      <Header />
      <div id="app-holder">
        <div id="content-holder">
          <div className="nav-wrapper">
            <div className="sidebar">
              <ul>
                <li className="">
                  <p className="username">{name}</p>

                </li>
                <li className="list-item" onClick={() => toggle(true)}>
                  <IconContext.Provider value={{ size: '1.5em', className: 'react-icons' }}>
                    <span id="profile" className="list-icon">
                      <MdPerson />
                    </span>
                    <span>Profile</span>
                  </IconContext.Provider>

                </li>
                <li className="list-item" onClick={() => toggle(false)}>
                  <IconContext.Provider value={{ size: '1.5em', className: 'react-icons' }}>

                    <span id="video" className="list-icon">
                      <MdVideocam />
                    </span>
                    <span>Video Feed</span>
                  </IconContext.Provider>

                </li>
                <li className="list-item" onClick={() => signout()}>
                  <IconContext.Provider value={{ size: '1.5em', className: 'react-icons' }}>
                    <span id="profile" className="list-icon">
                      <FiLogOut />
                    </span>
                    <span>Log out</span>
                  </IconContext.Provider>

                </li>
              </ul>
            </div>
          </div>

          {showProfile && <Profile setName={setName} setRoom={props.setRoom} volunteers={props.volunteers} users={props.users} />}
          {!showProfile && <Video volunteers={props.volunteers} users={props.users} matches={props.matches} />}


        </div>
      </div>
    </div>
	 );
}

export default Main;
