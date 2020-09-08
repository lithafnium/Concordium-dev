import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';


require('firebase/auth');



function Form(props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [originalLoc, setOriginalLoc] = useState('');
  const [interests, setInterests] = useState('');
  const [topics, setTopics] = useState('');
  const [languages, setLanguages] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');


  function handleName(event) {
    setName(event.target.value);
  }

  function handleAge(event) {
    setAge(event.target.value);
  }

  function handleLocation(event) {
    setLocation(event.target.value);
  }

  function handleOriginalLoc(event) {
    setOriginalLoc(event.target.value);
  }

  function handleInterests(event) {
    setInterests(event.target.value);
  }

  function handleTopics(event) {
    setTopics(event.target.value);
  }


  function handleLanguages(event) {
    setLanguages(event.target.value);
  }


  function form() {


    const user = firebase.auth().currentUser;
    if (user) {
	  		// console.log(user);
	  		// console.log(user.uid);
	  		// console.log(user.email);
		  	const data = {
		  		email: user.email,
		  		name,
		  		age,
		  		location,
		  		originalLocation: originalLoc,
		  		interests,
        languages,
        topics,
				times: [],
		  		imgurl: require('../assets/home/people/placeholder.png'),
      };
	  		props.users.doc(user.uid).set(data).then(() => {
	  			window.location.href = '/tool';
	  		});
    }
  }

  return (
    <div className="form">
      <div className="formContainer">

        <div className="questionForm">
          <h2>Questionnaire</h2>
          <div className="container">
            <ul>
              <li>

                <p>What is your name?</p>
                <input className="textInput" type="text" placeholder="Your Name" name="uname" onChange={handleName} />
              </li>

              <li>
                <p>Location</p>
                <input className="textInput" type="text" placeholder="Location" name="psw" onChange={handleLocation} />
              </li>
              <li>
                <p>What is your age?</p>
                <input className="textInput" type="text" placeholder="Age" name="psw" onChange={handleAge} />
              </li>
            </ul>
            <ul>
              <li>
                <p>Where are you from?</p>
                <input className="textInput" type="text" placeholder="Original Location" name="psw" onChange={handleOriginalLoc} />
              </li>
              <li>
                <p>What language(s) do you speak?</p>
                <input className="textInput" type="text" placeholder="Language" name="psw" onChange={handleLanguages} />
              </li>
              <li>
                <p>What are your interests?</p>
                <input className="textInput" type="text" placeholder="Interests" name="psw" onChange={handleInterests} />
              </li>
              <li>
                <p>What do you want to talk about?</p>
                <input className="textInput" type="text" placeholder="Topics" name="psw" onChange={handleTopics} />
              </li>
            </ul>
          </div>

          <button className="formButton" type="submit" onClick={form}>Submit</button>

        </div>

      </div>
    </div>
  );
}

export default Form;
