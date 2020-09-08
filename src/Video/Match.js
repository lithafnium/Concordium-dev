import React, { useState, useEffect } from 'react';

const moment = require('moment-timezone');


function Match(props) {
  const days = ['Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const tmpDate = new Date('10:00 AM EST');
  console.log(moment.tz.guess());

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

  const daytimes = ['19:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];
  const times = [`${10 - offset}:00 AM Monday`, `${10 - offset}:00 AM Tuesday`, `${10 - offset}:00 AM Wednesday`, `${10 - offset}:00 AM Thursday`, `${10 - offset}:00 AM Friday`, `${10 - offset}:00 AM Saturday`, `${10 - offset}:00 AM Sunday`,
    `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Monday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Tuesday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Wednesday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Thursday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Friday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Saturday`, `${1 - offset}:00 ${offset > 1 ? 'AM' : 'PM'} Sunday`,
    `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Monday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Tuesday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Wednesday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Thursday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Friday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Saturday`, `${4 - offset}:00 ${offset > 4 ? 'AM' : 'PM'} Sunday`,
    `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Monday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Tuesday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Wednesday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Thursday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Friday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Saturday`, `${7 - offset}:00 ${offset > 7 ? 'AM' : 'PM'} Sunday`,];

  const [name, setName] = useState('');
  const [age, setAge] = useState('...');
  const [location, setLocation] = useState('...');
  const [originalLoc, setOriginalLoc] = useState('...');
  const [interests, setInterests] = useState('...');
  const [topics, setTopics] = useState('...');
  const [languages, setLanguages] = useState('...');
  const [token, setToken] = useState('');
  useEffect(() => {
    // User is signed in.
    console.log('time', props.time);
    let userRef = props.users.doc(props.match);
    if (!props.volunteer) {
      userRef = props.volunteers.doc(props.match);
    }

    const getDoc = userRef.get().then((doc) => {
      setName(doc.data().name);
      setAge(doc.data().age);
      setLocation(doc.data().location);
      setOriginalLoc(doc.data().originalLocation);
      setLanguages(doc.data().languages);
      setInterests(doc.data().interests);
      setTopics(doc.data().topics);
      setToken(doc.data().token);
      console.log('here', doc.data().token);
    });
  }, [props.time]);
  return (
    <div className="matchCard">
      <h2>{name}</h2>
      <p>{times[props.time]}</p>
      <div className="matchInfo">
        <ul className="infoList">

          <li>
            <p className="listHeader">Name</p>
            <p className="listContent">{name}</p>

          </li>
          <li>
            <p style={age === '' ? { display: 'none' } : {}} className="listHeader">Age</p>
            <p style={age === '' ? { display: 'none' } : {}} className="listContent">{age}</p>
          </li>
          <li>
            <p style={location === '' ? { display: 'none' } : {}} className="listHeader">Location</p>
            <p style={location === '' ? { display: 'none' } : {}} className="listContent">{location}</p>
          </li>
        </ul>
        <ul className="infoList">
          <li>
            <p style={originalLoc === '' ? { display: 'none' } : {}} className="listHeader">Where are you from originally?</p>
            <p style={originalLoc === '' ? { display: 'none' } : {}} className="listContent">{originalLoc}</p>
          </li>
          <li>
            <p style={languages === '' ? { display: 'none' } : {}} className="listHeader">What languages do you speak?</p>
            <p style={languages === '' ? { display: 'none' } : {}} className="listContent">{languages}</p>
          </li>
          <li>
            <p style={interests === '' ? { display: 'none' } : {}} className="listHeader">Hobbies</p>
            <p style={interests === '' ? { display: 'none' } : {}} className="listContent">{interests}</p>
          </li>
          <li>
            <p style={topics === '' ? { display: 'none' } : {}} className="listHeader">What do you want to talk about?</p>
            <p style={topics === '' ? { display: 'none' } : {}} className="listContent">{topics}</p>
          </li>

        </ul>
        <button onClick={() => window.open(`https://${token}`)} className="join">
          Join Call
        </button>
      </div>
    </div>
  );
}

export default Match;
