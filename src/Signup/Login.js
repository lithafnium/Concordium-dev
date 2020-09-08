import React, {useState, useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import firebase from 'firebase/app'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";
import Alert from "@material-ui/lab/Alert";
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import './login.css'
require('firebase/auth')

function Login(props){
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [wrongEmailPassword, setWrongEmailPassword] = useState(false);

	useEffect(() => {
		firebase.auth().signOut().then(function() {
  		// Sign-out successful.
		}, function(error) {
		  // An error happened.
		});

		var user = firebase.auth().currentUser;

		if(user){
			console.log(user);
			// if(user.uid == "c9QnLfFLHGXUv3wIFJNvrJ8xYKm2"){
			// 	window.location.href = "/admin";
			// }
			let userRef = props.volunteers.doc(user.uid)
			let getDoc = userRef.get().then(doc => {
				if(doc.exists){
					window.location.href = '/volunteer-tool/chat'
				} else {
					window.location.href = 'tool';
				}
			})
		}
	}, [props.volunteers]);


	function handleWrongEmailPassword(event) {
		setWrongEmailPassword(event.target.value);
	}

	function handleEmail(event){
		setEmail(event.target.value);
	}

	function handlePassword(event){
		setPassword(event.target.value);
	}


	function logIn(){
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
		        // Existing and future Auth states are now persisted in the current
		        // session only. Closing the window would clear any existing state even
		        // if a user forgets to sign out.
		        // ...
		        // New sign-in will be persisted with session persistence.

		        return firebase.auth().signInWithEmailAndPassword(email, password);
		      }).catch(function(error) {

		        // Handle Errors here.
		        var errorCode = error.code;
		        var errorMessage = error.message;
		        //alert(errorMessage);

			if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
				setWrongEmailPassword(true);
			} else {
				setWrongEmailPassword(true);
			}
			// console.log(error);
		});

		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
			//alert("successful login " + firebase.auth().currentUser.uid);
			// if(user.uid == "c9QnLfFLHGXUv3wIFJNvrJ8xYKm2"){
			// 	window.location.href = "/admin";
			// }

			let userRef = props.volunteers.doc(user.uid)
			let getDoc = userRef.get().then(doc => {
				if(doc.exists){
					window.location.href = '/volunteer-tool/chat'
				} else {
					window.location.href = '/tool';
				}
			})


		  } else {
		    // No user is signed in.
		    // alert("no one is logged in")
		  }
		});

	}



	return(
		<div className="login">
		<div className = "formContainer">
			<div className = "pictureContainer">
				<img src ={require('../assets/login/login.svg')} alt='login'/>
			</div>
			<div className = "loginContainer">
				<div className = "loginForm" style={{backgroundColor: '#f7fafc', borderRadius: 20}}>
					<h2>Log In</h2>

				<div className = "dash">
					<form>
					<FormGroup s>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText >
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" style={{color: 'black'}} onChange = {handleEmail}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input style={{color: 'black'}}placeholder="Password" type="password" autoComplete="new-password" onChange = {handlePassword}/>
                  </InputGroup>
                </FormGroup>
					</form>
								</div>

					{/* <p>Email</p>
					<input className = "textInput" type="text" placeholder="Enter Email" name="uname" onChange = {handleEmail}/>

					<p>Password</p>
					<input className = "textInput" style={{borderBottomColor: 'gray'}} type="password" placeholder="Enter Password" name="psw" onChange = {handlePassword}/> */}
					<button className = "formButton" type="submit" onClick = {logIn}>Login</button>

					<p className = "signup">Are you new? <Link to = "/signup">Sign up</Link></p>

					<Alert style={wrongEmailPassword ? {} : {display: 'none'}} variant="outlined" severity="error">
						Wrong email or password
					</Alert>

				</div>
			</div>

		</div>
		</div>
		);
}

export default Login;
