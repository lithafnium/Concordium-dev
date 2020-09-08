import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import Alert from '@material-ui/lab/Alert';
import { firebaseSetup } from '../firebaseConfig';
import './signup.css';

require('firebase/auth');


function Signup(props) {
  const [password, setPassword] = useState('');
  const [reEnter, setReEnter] = useState('');
  const [email, setEmail] = useState('');
  const [volunteer, setVolunteer] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isMatching, setIsMatching] = useState(true);

  function handleWeakPassword(event) {
    setWeakPassword(event.target.value);
  }

  function handleEmailInUse(event) {
    setEmailInUse(event.target.value);
  }

  function handleInvalidEmail(event) {
    setInvalidEmail(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleWrongPassword(event) {
    setWrongPassword(event.target.value);
  }

  function handleReEnter(event) {
    setReEnter(event.target.value);
  }


  function onboardAsVolunteer() {
    if (!email.trim().match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\\.edu$')) {
      setWrongPassword(true);
    } else if (password !== reEnter) {
			setIsMatching(false);
			setWrongPassword(false);
    } else {
			setVolunteer(!volunteer);
			setIsMatching(true);
      onboard(true);
    }
  }

  function onboardAsSenior() {
		// setVolunteer(false)
		if (password !== reEnter) {
			setIsMatching(false);
		} else {
			setIsMatching(true);
			onboard(false);
		}

  }

  function onboard(isVolunteer) {
    if (password === reEnter && password != '') {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
			  // console.log("error");
			  // Handle Errors here.
			  const errorCode = error.code;
			  const errorMessage = error.message;

			  // if (errorCode === 'auth/email-already-in-use') {
			  // 	setEmailInUse(true);
			  // } else if (errorCode === 'auth/invalid-email') {
			  // 	setEmailInUse(false);
			  // 	setInvalidEmail(true);
			  // } else if (errorCode === 'auth/weak-password') {
			  // 	setEmailInUse(false);
			  // 	setInvalidEmail(false);
			  // 	setWeakPassword(true);
				// }
				
				if (errorCode === 'auth/email-already-in-use') {
					setEmailInUse(true);
				} else {
					setEmailInUse(false)
				}


			  // ...
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          var user = firebase.auth().currentUser;

			  		const userEmail = {
			  			email: user.email,
					  };
          if (!isVolunteer) {
            props.users.doc(user.uid).set(userEmail).then(() => {
              window.location.href = '/form';
            });
          } else {
            props.volunteers.doc(user.uid).set(userEmail).then(() => {
              window.location.href = '/volunteerform';
            });
          }
        }
      });
    }
  }
  return (
    <div className="signup">
      <div className="formContainer">
        <div className="pictureContainer">
          <img src={require('../assets/login/login.svg')} alt="signup" />
        </div>
        <div className="loginContainer">
          <div className="loginForm">

            <h2>Sign Up</h2>
            <p>Email</p>
            <input className="textInput" type="text" value={email} placeholder="Enter Email" name="uname" onChange={handleEmail} />

            <p>Password</p>
            <input className="textInput" type="password" placeholder="Enter Password" name="psw" onChange={handlePassword} />

            <p>Re-Enter Password</p>
            <input className="textInput" type="password" placeholder="Enter Password" name="psw" onChange={handleReEnter} />
            {/* <label> */}
            {/* <input */}
            {/*	name="isGoing" */}
            {/*	type="checkbox" */}
            {/*	checked={volunteer} */}
            {/*	onChange = {() => setVolunteer(!volunteer)}/> */}
            {/*	I am a Volunteer */}
            {/* </label> */}

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button className="signupButton" style={{ display: 'inline-block', float: 'left' }} type="submit" onClick={onboardAsVolunteer}>Sign up as Younger Adult</button>
              <button className="signupButton" style={{ display: 'inline-block', float: 'right' }} type="submit" onClick={onboardAsSenior}>Sign up as Older Adult</button>
            </div>

            {/* <div className="divider" /> */}

            <div style={{ clear: 'both' }}>
              <p className="signup">
                Already have an account?
                <Link to="/login">Log in</Link>
              </p>
            </div>

            <Alert style={wrongPassword ? {} : { display: 'none' }} variant="outlined" severity="error">
              Volunteers must have a '.edu' email address
            </Alert>
            <Alert style={!isMatching ? {} : { display: 'none' }} variant="outlined" severity="error">
              The passwords must match
            </Alert>
						<Alert style={emailInUse ? {} : { display: 'none' }} variant="outlined" severity="error">
              This email you typed in is already in use. Please try another one
            </Alert>

            {/* <button className = "formButton" type="submit" onClick = {onboard(true)}>Sign up as a Volunteer</button> */}


          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;
