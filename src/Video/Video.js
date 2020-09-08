import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import Schedule from './Schedule';
import Match from './Match';
import sendMail from '../utils/sendEmail'
require('firebase/auth');

function Video(props) {
  const [match, setMatch] = useState('');
  const [matchID, setMatchid] = useState('');
  const [matchTime, setMatchTime] = useState(-1);
  const [room, setRoom] = useState('');
  const [call, joinCall] = useState(false);
  const [volunteer, setVolunteer] = useState(false);
  const [name, setName] = useState('test');
  const [matches, setMatches] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [token, setToken] = useState('');
  const [matchesList, setMatchesList] = useState([])


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let userRef = props.users.doc(user.uid);
      let getDoc = userRef.get().then((doc) => {
        if (doc.exists) {
          setName(doc.data().name);
          setMatchesList(doc.data().matches);
        }
      });
      if (name === 'test') {
        userRef = props.volunteers.doc(user.uid);
        getDoc = userRef.get().then((doc) => {
          if (doc.exists) {
            setName(doc.data().name);
            setVolunteer(true);
          }
        });
      }
    } else { window.location.href = '/login'; }
  });

  function getMatch() {
    const user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      let userRef = props.users.doc(user.uid);
      if (volunteer) {
        userRef = props.volunteers.doc(user.uid);
      }

      let getDoc = userRef.get().then((doc) => {
        if (doc.exists) {
          const matchid = doc.data().match;
          setMatchid(matchid);
          setRoom(matchid);
          let match = '';
          if (matchid) {
            const matchesRef = props.matches.doc(matchid);

            const getMatch = matchesRef.get().then((matchDoc) => {
              console.log('got here')

              if (matchDoc.data().user == user.uid) {
                match = matchDoc.data().volunteer;
              } else match = matchDoc.data().user;
              setMatchTime(matchDoc.data().time);
              setMatch(match);
            });
          }
        } else {
          userRef = props.volunteers.doc(user.uid);
          getDoc = userRef.get().then((doc) => {
            setMatches(doc.data().matches);
          });
        }
      });
    } else {
      // No user is signed in.
    }
  }


  function findMatch() {
    let found = false;
    const user = firebase.auth().currentUser;

    if (match !== '') {
      const matchesRef = props.matches.doc(matchID);
      const getMatch = matchesRef.get().then((matchDoc) => {
        const volunteerId = matchDoc.data().volunteer;
        const userID = matchDoc.data().user;

        const removeVolunteerMatch = props.volunteers.doc(volunteerId).update({
          match: firebase.firestore.FieldValue.delete(),
        });

        const removeUserMatch = props.users.doc(userID).update({
          match: firebase.firestore.FieldValue.delete(),
        });

        const deleteDoc = props.matches.doc(matchID).delete();

        const arrUnion = props.volunteers.doc(volunteerId).update({
          times: firebase.firestore.FieldValue.arrayUnion(matchTime),
        });

        const arrRemove = props.volunteers.doc(volunteerId).update({
          taken: firebase.firestore.FieldValue.arrayRemove(matchTime),
        });
      });
    }
    setMatch('');
    const userRef = props.users.doc(user.uid);
    const getDoc = userRef.get().then((doc) => {
      const { times } = doc.data();
      console.log(`times are ${times}`);
      const allVolunteers = props.volunteers.get().then((snapshot) => {
        snapshot.forEach((vdoc) => {
          console.log(vdoc.id, '=>', vdoc.data());
          const volunteerTimes = vdoc.data();
          console.log(`volunteer times are ${JSON.stringify(volunteerTimes)}  ${typeof volunteerTimes}`);

          times.forEach((time, i) => {
            console.log(`time is${time}   ${typeof time}`);
            // console.log(volunteerTimes.includes(time))
            if (volunteerTimes.times.includes(time) && !found) {
              found = true;
              props.matches.add({
                user: user.uid,
                name: doc.data().name,
                volunteer: vdoc.id,
                volunteerName: vdoc.data().name,
                time,
              }).then((ref) => {
                const data = {
                  match: ref.id,
                  room: vdoc.data().token,

                };

                setToken(vdoc.data().token);
                // sendMail(user.email)
                // sendMail(vdoc.data().email)


                sendMail(vdoc.data().email);

                props.users.doc(user.uid).update(data);
                props.volunteers.doc(vdoc.id).update({matches: firebase.firestore.FieldValue.arrayUnion(data.match)});
                // const getMatchJson = async (match) => {
                //   console.log('got here')
                //   try {
                //     const result = await fetch(`/getMatch/${match}`)
                //     const resJson = await result.json()
                //     return resJson;
                //   } catch (error) {
                //     console.log('error fetching match', error);
                //   }
                //   return 'false';
                // }
                //
                // let jsonMatch = [];
                // console.log('matches is ', matchesList)
                // for (let match in matchesList) {
                //   console.log('match is', match)
                //   jsonMatch.push(getMatchJson(match))
                //   if (!jsonMatch.includes(getMatchJson(matchID))) {

                //   }
                // }
                const arrUnion = props.volunteers.doc(vdoc.id).update({
                  taken: firebase.firestore.FieldValue.arrayUnion(time),
                });

                const arrRemove = props.volunteers.doc(vdoc.id).update({
                  times: firebase.firestore.FieldValue.arrayRemove(time),
                });
                setMatchid(ref.id);
                setToken(data.room)
                setMatchTime(time);
                setMatch(vdoc.id);
              });
            } else {
              setToken(vdoc.data().token);
            }
          });
        });
      });
    });
  }


  useEffect(() => {
    getMatch();
  }, []);

  return (
    <div className="videoContainer">
      <div style={{ display: 'inlineBlock' }}>
        <h2>Availability</h2>
        <Schedule volunteer={volunteer} volunteers={props.volunteers} users={props.users} />
        {!volunteer && <button style={{ marginTop: '20px' }} onClick={findMatch}>Find A Younger Adult</button>}

      </div>

      <h2>Scheduled Calls</h2>


      <div style={{ display: 'inline-block' }}>
        {match !== '' ? <Match time={matchTime} volunteer={volunteer} volunteers={props.volunteers} joinCall={joinCall} token={token} match={match} users={props.users} /> : <p>No Available Matches!</p>}
      </div>
      <div style={{ display: 'inline-block' }}>
        <div style={{
          display: 'inline-block',
          width: '120px',
          marginLeft: '20%',
          height: '120px',
        }}
        />
        <div style={{
          width: '120px',
          marginLeft: '20%',
          height: '120px',
        }}
        />
      </div>
      {matches && matches.map((matchId, index) => {


      })}
      {/* {call && <Lobby name = {name} room = {room}/>} */}

    </div>
  );
}

export default Video;
