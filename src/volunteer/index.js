import React, {
  FC, useEffect, useRef, useState,
} from 'react';
import firebase from 'firebase/app';
import '../assets/css/argon-dashboard-react.css';
import '../assets/css/icons/css/nucleo.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Sidebar from './Sidebar';
import AdminNavbar from './Navbars/AdminNavbar.js';
import AdminFooter from './Footers/AdminFooter.js';

import routes from './routes';

require('firebase/auth');
require('firebase/storage');
require('firebase/database');


const VolunteerTool = (props) => {
  const mainContent = useRef();
  const [imgUrl, setURL] = useState(require('../assets/home/people/placeholder.png'));
  const [currUser, setUser] = useState(null);
  const [name, setName] = useState(' ');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [originalLoc, setOriginalLoc] = useState('');
  const [languages, setLanguages] = useState('');
  const [interests, setInterests] = useState('');
  const [topics, setTopics] = useState('');
  const [school, setSchool] = useState('');
  const [volunteer, setVolunteer] = useState('');
  const [volunteerInfo, setVolunteerInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('test');
  const [matches, setMatches] = useState([])

  // const volunteerInfo =
  // [
  // 	{name: name},
  // 	{age: age},
  // 	{location: location},
  // 	{originalLoc: originalLoc},
  // 	{location: location},
  // 	{languages: languages},
  // 	{interests: interests},
  // 	{topics: topics},
  // 	{school: school},
  // 	{volunteer: volunteer},
  // ]

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsLoading(false);
    } else {
      // // No user is signed in.
      // window.location.href = "/login";
    }
  });

  useEffect(() => {
    async function getData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          setUser(user);
          const userRef = props.volunteers.doc(user.uid);

          const getDoc = userRef.get().then((doc) => {
            if (doc.exists) {
              setName(doc.data().name);
              setURL(doc.data().imgurl);
              setAge(doc.data().age);
              setLocation(doc.data().location);
              setOriginalLoc(doc.data().originalLocation);
              setLanguages(doc.data().languages);
              setInterests(doc.data().interests);
              setTopics(doc.data().topics);
              setSchool(doc.data().school);
              setMatches(doc.data().matches)
              setVolunteer(doc.data().volunteer);
              setIsLoading(false);
              setVolunteerInfo([
                { name },
                { age },
                { location },
                { originalLoc },
                { location },
                { languages },
                { interests },
                { topics },
                { school },
                { volunteer },
              ]);
            }
          });
        } else {
          // No user is signed in.
          window.location.href = '/login';
        }
      });
    }

    getData();
  }, []);

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

  const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
      React.createElement(component, finalProps)
    );
  };

  const PropsRoute = ({ component, ...rest }) => (
    <Route
      {...rest}
      render={(routeProps) => renderMergedProps(component, routeProps, rest)}
    />
  );

  const getRoutes = (routes) => routes.map((prop, key) => {
    if (prop.layout === '/volunteer-tool') {
      return (
        <PropsRoute
          path={prop.layout + prop.path}
          name={name}
          age={age}
          school={school}
          location1={location}
          originalLoc={originalLoc}
          languages={languages}
          interests={interests}
          topics={topics}
          matchesList={matches}
          component={prop.component}
          image={imgUrl}
          key={key}
        />
      );
    }
    return null;
  });


  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(
          routes[i].layout + routes[i].path,
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  if (!isLoading) {
    return (
      <div className="dash">
        <Sidebar

          routes={routes}
          name={name}
          image={imgUrl}
          logo={{
            innerLink: '/volunteer-tool/index',
            imgSrc: require('../assets/concordium-01.svg'),
            imgAlt: '...',
          }}
        />
        <div className="main-content" ref={mainContent}>
          <AdminNavbar
            name={name}
            image={imgUrl}
            volunteerInfo={volunteerInfo}
            {...props}
            brandText={getBrandText(props.location.pathname)}
          />
          <Switch>
            {getRoutes(routes)}
            <Redirect from="*" to="/volunteer-tool" />
          </Switch>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
      </div>
    );
  }
  return <div/>;


  // }
};


export default VolunteerTool;
