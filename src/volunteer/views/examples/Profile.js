
import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/app';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Link, animateScroll as scroll } from 'react-scroll';

import UserHeader from '../../Headers/UserHeader.js';
import { firebaseSetup } from '../../../firebaseConfig.js';


require('firebase/auth');
require('firebase/storage');
require('firebase/database');


function Profile(props) {
  const db = firebaseSetup.firestore();
  const volunteers = db.collection('volunteers');
  const inputFile = useRef(null);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [originalLocation, setOriginalLocation] = useState('');
  const [languages, setLanguages] = useState('');
  const [interests, setInterests] = useState('');
  const [topics, setTopics] = useState('');
  const [school, setSchool] = useState('');
  const [imgurl, setURL] = useState(require('../../../assets/home/people/placeholder.png'));

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     email: '',
  //     name: '',
  //     age: '',
  //     location: '',
  //     originalLocation: '',
  //     languages: '',
  //     interests: '',
  //     topics: '',
  //   }
  // }


  useEffect(() => {
    const user = firebase.auth().currentUser;
    setEmail(user.email);
    setName(props.name);
    setAge(props.age);
    setSchool(props.school);
    setLocation(props.location1);
    setOriginalLocation(props.originalLoc);
    setInterests(props.interests);
    setTopics(props.topics);
    if (user) {
      const userRef = volunteers.doc(user.uid);
      const getDoc = userRef.get().then((doc) => {
        if (doc.exists) {
          setURL(doc.data().imgurl);
          setLanguages(doc.data().languages);
        }
      });
    }
  }, []);

  function propic() {
    inputFile.current.click();
  }

  function getFile(e) {
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
		  		volunteers.doc(user.uid).update(data);
      }).catch((error) => {
			  // Handle any errors
      });
    });
  }

  const editInfo = () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const data = {
        email,
        name,
        age,
        location,
        languages,
        originalLocation,
        interests,
        topics,
      };

      const userRef = volunteers.doc(user.uid);
      const getDoc = userRef.get().then((doc) => {
        if (doc.exists) {
          volunteers.doc(user.uid).update(data).then((r) => {
            console.log(r);
          });
        }
      });
    }
  };

  return (
    <>
      <UserHeader name={name} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a onClick={() => propic()}>
                      <div className="tool">
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={imgurl}
                        />
                        <input
                          onChange={(e) => getFile(e)}
                          type="file"
                          id="avatar"
                          name="avatar"
                          ref={inputFile}
                          accept="image/png, image/jpeg"
                          style={{ display: 'none' }}
                        />
                      </div>

                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between" />
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5" />
                  </div>
                </Row>
                <div className="text-center" style={{ marginTop: -10 }}>
                  <h3>

                    {name}

                    <span className="font-weight-light">
                      ,
                      {age}
                    </span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {originalLocation}
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    {school}
                  </div>
                  <hr className="my-4" />
                  <p>
                    <strong>Interested In:</strong>
                    {' '}
                    <em>{interests}</em>
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <div id="edit_profile" />
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      onClick={(e) => {
                        editInfo();
                      }}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Name
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={name}
                            id="input-username"
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-school"
                          >
                            Original Location
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-school"
                            defaultValue={originalLocation}
                            type="email"
                            onChange={(e) => setOriginalLocation(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            School
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={school}
                            id="input-first-name"
                            placeholder="Your School"
                            type="text"
                            onChange={(e) => setSchool(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-age"
                          >
                            Age
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={age}
                            id="input-last-name"
                            type="number"
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Interests
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={interests}
                            id="input-username"
                            onChange={(e) => setInterests(e.target.value)}
                            placeholder="Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-school"
                          >
                            Location
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-school"
                            defaultValue={location}
                            type="email"
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Topics
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={topics}
                            id="input-first-name"
                            placeholder="Your School"
                            type="text"
                            onChange={(e) => setTopics(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-age"
                          >
                            Languages
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={languages}
                            id="input-last-name"
                            type="text"
                            onChange={(e) => setLanguages(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
