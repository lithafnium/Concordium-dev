
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const twilio = require('twilio');
const config = require('./config');
const express = require('express');
const firebase = require('firebase/app');
const sgMail = require('@sendgrid/mail');

require('firebase/firestore');

const bodyParser = require('body-parser');

const TWILIO_ACCOUNT_SID = 'AC6269bb3ae96ed865b0643d66aa3b4359';
const TWILIO_API_KEY = 'SK57712055f312074805648733f52ae13e';
const TWILIO_API_SECRET = 'WW4MCkHVfaa5mve8KbKzrG5sqY4P4cui';
const mail_api_key = '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';
sgMail.setApiKey(mail_api_key);

// const pino = require('express-pino-logger')();


const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyBzxItuat3bGZXNeWqMfSKAMeI_pF84bwQ',
  authDomain: 'concordium-c49c3.firebaseapp.com',
  databaseURL: 'https://concordium-c49c3.firebaseio.com',
  projectId: 'concordium-c49c3',
  storageBucket: 'concordium-c49c3.appspot.com',
  messagingSenderId: '298501671703',
  appId: '1:298501671703:web:346a53a7ca5cd72c768552',
  measurementId: 'G-2LRBERN2SN',
});

const { AccessToken } = twilio.jwt;
const { VideoGrant } = AccessToken;
const db = firebaseConfig.firestore();
const volunteers = db.collection('volunteers');
const users = db.collection('users');
const matches = db.collection('matches');


const generateToken = () => new AccessToken(
  TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY,
  TWILIO_API_SECRET,
);

const videoToken = (identity, room) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config);
  token.addGrant(videoGrant);
  token.identity = identity;

  return token;
};


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(pino);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    }),
  );
};

app.get('/app/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello cjdosfdsof ${name}!` }));
});

app.get('/app/video/token', (req, res) => {
  const { identity } = req.query;
  const { room } = req.query;
  // res.send(JSON.stringify({ greeting: `video/token get` }));
  const token = videoToken(identity, room, config);
  console.log(token);
  sendTokenResponse(token, res);
});

app.get('/app/email', (req, res) => {
  const msg = {
    to: 'rohanminocha@gmail.com',
    from: 'test@example.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
	sgMail.send(msg);
	res.send('true')
});


app.post('/app/video/token', (req, res) => {
  const { identity } = req.body;
  const { room } = req.body;
  const token = videoToken(identity, room);
  // res.send(JSON.stringify({ greeting: `${token}` }));

  console.log(token);
  sendTokenResponse(token, res);
});


app.get('/api/matches/:volunteerId', (req, res) => {
  res.set('Content-Type', 'application/json');
  const { volunteerId } = req.params;
  const ref = volunteers.doc(volunteerId);
  const getDoc = ref.get()
    .then((doc) => {
      if (!doc.exists) {
        console.log('No such Document!');
      } else {
        res.send(doc.data());
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(volunteerId);
});

app.get('/app/api/app-id', async (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(
    {
      id: '62437e0c1207459d8becfd33432cede7',
    },
  ));
});


app.listen(3001, () => console.log('Express server is running on localhost:3000'));


// TODO: delete match with given id
// TODO: create match given time, volunteerId, seniorId and insert match field into respective docs
// TODO: get favorites given seniorId
// TODO: query database for match given match id


// TODO: get recents given seniorId
// TODO: set recent in seniorId based on volunteerId -> would insert on join call and would replace
// TODO: insert match id into volunteer
// TODO: get info from match id
// TODO: on post call survey, delete match
// TODO: Set favorites in senior based on volunteerId
// TODO: get all matches from matches array in volunteer
