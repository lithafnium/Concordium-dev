import React, { useState, useEffect } from 'react';
import {
  Grommet, Box, Button, Heading, Paragraph, Text,
} from 'grommet';
import firebase from 'firebase';
import CallCard from '../../CallCard';
import { firebaseSetup } from '../../../firebaseConfig';
import Schedule from './Schedule';

const moment = require('moment-timezone');

const db = firebaseSetup.firestore();
const matches = db.collection('matches');
const volunteers = db.collection('volunteers');
const users = db.collection('users');

const Chat = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [matchesList, setMatchesList] = useState([]);
  const [usersId, setUsersId] = useState([]);
  const [numCards, setNumCards] = useState(0);
  const [callUrl, setCallUrl] = useState('/#');

  function convertDateToAnotherTimeZone(date, timezone) {
    const dateString = date.toLocaleString('en-US', {
      timeZone: timezone,
    });
    return new Date(dateString);
  }

  function getOffsetBetweenTimezonesForDate(date, timezone1, timezone2) {
    const timezone1Date = convertDateToAnotherTimeZone(date, timezone1);
    const timezone2Date = convertDateToAnotherTimeZone(date, timezone2);
    return timezone1Date.getTime() - timezone2Date.getTime();
  }

  const offset = getOffsetBetweenTimezonesForDate(new Date(), 'America/New_York', moment.tz.guess()) / 3600000;

  const times = [`${10 - offset}:00 AM Monday`, `${10 - offset}:00 AM Tuesday`, `${10 - offset}:00 AM Wednesday`, `${10 - offset}:00 AM Thursday`, `${10 - offset}:00 AM Friday`, `${10 - offset}:00 AM Saturday`, `${10 - offset}:00 AM Sunday`,
    `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Monday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Tuesday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Wednesday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Thursday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Friday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Saturday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Sunday`,
    `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Monday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Tuesday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Wednesday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Thursday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Friday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Saturday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Sunday`,
    `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Monday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Tuesday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Wednesday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Thursday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Friday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Saturday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Sunday`];


  // const data = [
  //   {
  //     name: 'Rohan Minocha',
  //     school: 'Hopkinton High School',
  //     time: '3:38PM',
  //     interests: 'Dancing',
  //     picture: require('../../../assets/home/people/placeholder.png'),
  //   },
  //
  // ];


  const renderCard = data.map((element) => (
    <CallCard callUrl={callUrl} picUrl={element.imgUrl} age={element.age} topics={element.topics} name={element.name} school={element.school} interests={element.interests} time={element.time} />
  ));

  useEffect(() => {
    async function getData() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userRef = volunteers.doc(user.uid);
          const getDoc = userRef.get().then((doc) => {
            if (doc.exists) {
              const matchesArray = doc.data().matches;
              setMatchesList(matchesArray);
              setCallUrl(doc.data().token);
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

  useEffect(() => {
    if (matchesList.length !== 0) {
      for (let i = 0; i < matchesList.length; i++) {
        const matchesRef = matches.doc(
          matchesList[i],
        );
        matchesRef.get().then((matchDoc) => {
          if (matchDoc.data() === undefined) {
            const user = firebase.auth().currentUser;
            const volRef = volunteers.doc(user.uid);
            volRef.update({
              matches: firebase.firestore.FieldValue.arrayRemove(matchesList[i]),
            });
          } else {
            setUsersId((usersId) => [...usersId, { id: matchDoc.data().user, time: matchDoc.data().time }]);
            setNumCards(matchesList.length);
          }

          // if (matchDoc.data().user == user.uid) {
          //   match = matchDoc.data().volunteer;
          // } else match = matchDoc.data().user;
          // setMatchTime(matchDoc.data().time);
          // setMatch(match);
        });
      }
    }
  }, [matchesList]);

  useEffect(() => {
    async function getData() {
      if (usersId.length !== 0) {
        for (let i = 0; i < usersId.length; i++) {
          const userRef = users.doc(usersId[i].id);
          const t = console.log('usersId:', usersId[i].time);
          const data1 = {};
          data1.time = times[usersId[i].time];
          userRef.get().then((userDoc) => {
            const dataJson = userDoc.data();
            data1.name = dataJson.name;
            data1.school = dataJson.school;
            data1.interests = dataJson.interests;
            data1.imgUrl = dataJson.imgUrl;
            data1.topics = dataJson.topics;
            data1.age = dataJson.age;
            // const data1 = {
            //   name: dataJson.name,
            //   school: dataJson.school,
            //   interests: dataJson.interests,
            //   imgUrl: dataJson.imgUrl,
            //   topics: dataJson.topics,
            // };
            setData((data) => [data1, ...data]);
          });
        }
      }
    }
    getData();
    setIsLoading(false);
  }, [usersId]);

  if (!isLoading) {
    return (
      <>


        <Grommet plain>

          <Box
            align="center"
            justify="center"
            pad="small"
            style={{ height: '100vh' }}
            background={{
              color: 'accent-4',
              image:
            "url('https://blog.hdwallsource.com/wp-content/uploads/2014/11/gradient-26052-26737-hd-wallpapers.jpg.png')",
            }}
            height="xlarge"
            flex={false}
            fill="vertical"
            direction="row"
            wrap
            overflow="auto"
          >

            <div style={{ position: 'relative' }} className="tool">
              <Schedule volunteer volunteers={volunteers} users={users} />
            </div>


            {renderCard}


          </Box>
        </Grommet>
      </>

    );
  }
  return (
    <div />
  );
};


export default Chat;
