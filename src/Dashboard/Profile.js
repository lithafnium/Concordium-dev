import React, { useEffect, useState, useRef } from 'react';
import { Lines } from 'react-preloaders';

import firebase from 'firebase/app';
import ProfileList from './ProfileList';

require('firebase/auth');
require('firebase/storage');
require('firebase/database');

function Profile(props) {
  const [imgurl, setURL] = useState(require('../assets/home/people/placeholder.png'));
  const inputFile = useRef(null);
  const [editProfile, toggleProfile] = useState(false);
  const [name, setName] = useState('...');
  const [age, setAge] = useState('...');
  const [location, setLocation] = useState('...');
  const [originalLoc, setOriginalLoc] = useState('...');
  const [interests, setInterests] = useState('...');
  const [topics, setTopics] = useState('...');
  const [school, setSchool] = useState('...');
  const [languages, setLanguages] = useState('...');
  const [volunteer, setVolunteer] = useState(false);
  const [edit, toggleEdit] = useState(false);
  const [currUser, setUser] = useState(null);
  const [loaded, setLoad] = useState(false);

  // var user = firebase.auth().currentUser;
  // if(!user){
  // 	window.location.href = "/login";
  // }

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
		  // User is signed in.
    } else {
		  // No user is signed in.
		  window.location.href = '/login';
    }
  });

  function propic() {
    inputFile.current.click();
  }

  function getFile(e) {
    // console.log(e.target.files[0]);
    // console.log(e.target.files[0].name)
    const file = e.target.files[0];
    const user = firebase.auth().currentUser;
    const picurl = `${user.uid}/profilePicture/${file.name}`;

    // Create a Storage Ref w/ username
    const storageRef = firebase.storage().ref(picurl);
    // Upload file
    const task = storageRef.put(file).then((snapshot) => {
      const propicRef = firebase.storage().ref();
      propicRef.child(picurl).getDownloadURL().then((url) => {
		  // `url` is the download URL for 'images/stars.jpg'
		  // Or inserted into an <img> element:
		  		setURL(url);
		  		const data = {
		  			imgurl: url,
		  		};
		  		props.users.doc(user.uid).update(data);
      }).catch((error) => {
			  // Handle any errors
      });
    });
  }

  function checkIfUserIsVolunteer(uid) {
    const usersRef = firebase.database().ref('users/');
    usersRef.child(uid).once('value', (snapshot) => {
      const exists = (snapshot.val() !== null);
      return exists;
    });
  }

  function editInfo() {
    toggleEdit(false);

    const user = firebase.auth().currentUser;
    if (user) {
      const data = {
        email: user.email,
        name,
        age,
        location,
        originalLocation: originalLoc,
        languages,
        interests,
        topics,
      };

      let userRef = props.volunteers.doc(user.uid);
      let getDoc = userRef.get().then((doc) => {
        if (doc.exists) {
          props.volunteers.doc(user.uid).update(data).then((r) => {
            console.log(r);
          });
        } else {
          userRef = props.users.doc(user.uid);
          getDoc = userRef.get().then((doc) => {
            props.users.doc(user.uid).update(data).then((r) => {
              console.log(r);
            });
          });
        }
      });
    }
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('here2');
        // User is signed in.
        setUser(user);
        let userRef = props.volunteers.doc(user.uid);
        console.log(`userRef is ${userRef}`);
        console.log('here6');
        let getDoc = userRef.get().then((doc) => {
          console.log('here5');
          if (doc.exists) {
            console.log('here3');
            setName(doc.data().name);
            setURL(doc.data().imgurl);
            props.setName(doc.data().name);
            setAge(doc.data().age);
            setLocation(doc.data().location);
            setOriginalLoc(doc.data().originalLocation);
            setLanguages(doc.data().languages);
            setInterests(doc.data().interests);
            setTopics(doc.data().topics);
            setSchool(doc.data().school);
            setVolunteer(doc.data().volunteer);
          } else {
            userRef = props.users.doc(user.uid);
            getDoc = userRef.get().then((doc) => {
              setName(doc.data().name);
              setURL(doc.data().imgurl);
              props.setName(doc.data().name);
              setAge(doc.data().age);
              setLocation(doc.data().location);
              setOriginalLoc(doc.data().originalLocation);
              setLanguages(doc.data().languages);
              setInterests(doc.data().interests);
              setTopics(doc.data().topics);
              setSchool(doc.data().school);
              setVolunteer(false);
            });
          }
        });
      } else {
        // No user is signed in.
        window.location.href = '/login';
      }
    });

    return function () {

    };
  }, []);


  if (firebase.auth().currentUser) {
    return (
      <div className="profileContainer">
        <div className="profileImg">
          <img src={imgurl} alt="asdf" />
          <input
            onChange={(e) => getFile(e)}
            type="file"
            id="avatar"
            name="avatar"
            ref={inputFile}
            accept="image/png, image/jpeg"
            style={{ display: 'none' }}
          />
          <div onClick={() => propic()} className="uploadPropic"><h2>Upload Picture</h2></div>
        </div>

        <div className="profileInfo">

          <h2>Info</h2>

          <div className="container">
            <ProfileList
              currUser={currUser}
              edit={edit}
              name={name}
              age={age}
              location={location}
              originalLoc={originalLoc}
              language={languages}
              interests={interests}
              topics={topics}
              school={school}
              volunteer={volunteer}
              setName={setName}
              setAge={setAge}
              setLocation={setLocation}
              setOriginalLoc={setOriginalLoc}
              setLanguage={setLanguages}
              setInterests={setInterests}
              setTopics={setTopics}
              setSchool={setSchool}
            />
          </div>
          {edit ? <button className="edit" onClick={() => editInfo()}>Submit</button>
            : <button className="edit" onClick={() => toggleEdit(true)}>Edit</button>}
        </div>
        <div className="schedule" />

      </div>
    );
  }
  return (<Lines color="#a51c30" />);
}

export default Profile;
