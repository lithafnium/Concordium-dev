import React, {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {firebaseSetup} from '../firebaseConfig';
import firebase from 'firebase/app'
require('firebase/auth')


function VolunteerSignup(props){

	const [password, setPassword] = useState("");
	const [reEnter, setReEnter] = useState("");
	const [email, setEmail] = useState("");

	function handleEmail(event){
		setEmail(event.target.value);
	}

	function handlePassword(event){
		setPassword(event.target.value);
	}

	function handleReEnter(event){
		setReEnter(event.target.value);
	}


	function signUp(){
		if(password === reEnter){
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			  console.log("error");
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  console.log(errorCode + ": " + errorMessage);
			  // ...
			});

			firebase.auth().onAuthStateChanged(function(user){
				if(user){
					var user = firebase.auth().currentUser;

			  		let userEmail = {
			  			email: user.email
			  		}
			  		props.users.doc(user.uid).set(userEmail).then(function(){
			  			window.location.href = "/form";
			  		});

				}
			});
		}


	}
	return(
		<div className = "formContainer">
			<div className = "pictureContainer">
				<img src ={require('../assets/login/login.svg')} alt='signup'/>
			</div>
			<div className = "loginContainer">
				<div className = "loginForm">

					<h2>Signup</h2>
					<p>Email</p>
					<input className = "textInput" type="text" placeholder="Enter Email" name="uname" onChange = {handleEmail} />

					<p>Password</p>
					<input className = "textInput" type="password" placeholder="Enter Password" name="psw" onChange = {handlePassword} />

					<p>Re-Enter Password</p>
					<input className = "textInput" type="password" placeholder="Enter Password" name="psw" onChange = {handleReEnter}/>

					<button className = "formButton" type="submit" onClick = {signUp}>Signup</button>
					<p className = "signup">Already have an account? <Link to = "/login">Log in</Link></p>


				</div>
			</div>

		</div>
		);
}

export default VolunteerSignup;
