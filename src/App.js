import React from 'react';

// import './App.css';
import './dist/tailwind.output.css';
import './tool.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import {
  About, AdvisoryBoard, ContactUs, Team,
} from './Home/views';
import Sidebar from './Dashboard/Sidebar';
import Profile from './Dashboard/Profile';
import Login from './Signup/Login';
import Main from './Dashboard/Main';
import Signup from './Signup/Signup';
import VolunteerSignup from './Signup/VolunteerSignup';
import VolunteerForm from './Signup/VolunteerForm';
import Form from './Signup/Form';
import Home from './Home/Home';
import { firebaseSetup } from './firebaseConfig';
import Meeting from './meeting';
import VolunteerTool from './volunteer';
import CheckoutForm from './donate/Donate';
// import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.db = firebaseSetup.firestore();
    this.volunteers = this.db.collection('volunteers');
    this.users = this.db.collection('users');
    this.matches = this.db.collection('matches');
    this.meetings = this.db.collection('meetings');

    this.state = {
      name: '',
      roomName: '',
    };

    // console.log(this.matches);
    // this.matches.get().then(function(querySnapshot){
    //     querySnapshot.forEach(function(doc){
    //         console.log(doc.id);
    //         console.log(doc.data().user1);
    //     });
    // });
    this.setName = this.setName.bind(this);
    this.setRoom = this.setRoom.bind(this);
  }

  setName(name) {
    this.setState(() => ({
      name,
    }));
  }

  // componentDidMount() {
  //   console.log('component mounting')
  //   this.meetings.orderBy('number').limit(1)
  //     .get()
  //     .then((querySnapshot) => {
  //       const doc = querySnapshot.docs[0];
  //       console.log(doc.data().url);
  //       // doc.ref.delete();
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, ' => ', doc.data());
  //     });
  // }

  setRoom(room) {
    this.setState(() => ({
      roomName: room,
    }));
  }

  render() {
    return (
      <Router>
        <div className="full">
          <Switch>
            <Route exact path="/login">
              <Login volunteers={this.volunteers} />
            </Route>

            <Route path="/meeting">
              <Meeting />
            </Route>


            <Route path="/signup">
              <Signup db={this.db} users={this.users} volunteers={this.volunteers} />
            </Route>
            <Route path="/form">
              <Form users={this.users} />
            </Route>

            <Route path="/donate">
              <div className="a">


                <div style={{
                  paddingTop: 50, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                >
                  <CheckoutForm />
                </div>
              </div>
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/contact">
              <ContactUs />
            </Route>

            <Route path="/advisors">
              <AdvisoryBoard />
            </Route>

            <Route path="/team">
              <Team />
            </Route>

            <Route path="/tool">
              <Main volunteers={this.volunteers} users={this.users} matches={this.matches} />
            </Route>
            <Route path="/volunteer-tool" render={(props) => <VolunteerTool {...props} volunteers={this.volunteers} />} />
            <Route path="/volunteer-tool/dashboard" render={(props) => <VolunteerTool {...props} volunteers={this.volunteers} />} />


            {/* <Route path = "/admin">
                        <Admin users = {this.users}/>
                    </Route> */}
            <Route path="/volunteerform">
              <VolunteerForm users={this.users} volunteers={this.volunteers} />
            </Route>
            <Route path="/volunteersignup">
              <VolunteerSignup db={this.db} users={this.users} />
            </Route>
            <Route path="/">
              <Home />
            </Route>
            {/* <Login */}
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
