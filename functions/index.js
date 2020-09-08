const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const twilio = require('twilio');
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const TWILIO_ACCOUNT_SID="AC6269bb3ae96ed865b0643d66aa3b4359";
const TWILIO_API_KEY="SK57712055f312074805648733f52ae13e";
const TWILIO_API_SECRET="WW4MCkHVfaa5mve8KbKzrG5sqY4P4cui";
// const pino = require('express-pino-logger')();
const cors = require('cors');




const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken = () => {
  return new AccessToken(
    TWILIO_ACCOUNT_SID,
    TWILIO_API_KEY,
    TWILIO_API_SECRET
  );
};

const router = express.Router()

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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
// app.use(pino);

// async function sendEmail() {
//   const mailgun = require("mailgun-js");
//   const DOMAIN = 'theconcordium.org';
//   const mg = mailgun({apiKey: api_key, domain: DOMAIN});
//   const data = {
//     from: 'Excited User <team@theconcordium.org>',
//     to: 'bar@example.com, rohanminocha@gmail.com',
//     subject: 'Hello',
//     text: 'Testing some Mailgun awesomness!'
//   };
//   mg.messages().send(data, function (error, body) {
//     console.log(body);
//   });
// }

// router.get('/api/contact', async (req, res) => {
//   try {
//     await sendEmail();
//     res.send('Email Sent!')
//   } catch(e) {
//     console.log('error in email is ' + e)
//     res.status(500);
//   }
// })


app.post('/api/contact', async (req, res, next) => {
  try {
    await sendEmail();
    res.send('Email Sent!')
  } catch(e) {
    // console.log('error in email is ' + e)
    res.status(500);
  }
})

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

app.get('/app/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello there ${name}!` }));
});



app.get('/app/api/app-id', async(req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({id:`62437e0c1207459d8becfd33432cede7`}))
})


app.get('/app/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  // res.send(JSON.stringify({ greeting: `video/token get` }));
  const token = videoToken(identity, room, config);
  // console.log(token);
  sendTokenResponse(token, res);

});
app.post('/app/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room);
   // res.send(JSON.stringify({ greeting: `${token}` }));

  // console.log(token);
  sendTokenResponse(token, res);
});




app.post('/app/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room);
   // res.send(JSON.stringify({ greeting: `${token}` }));

  // console.log(token);
  sendTokenResponse(token, res);
});




app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

exports.app = functions.https.onRequest(app);