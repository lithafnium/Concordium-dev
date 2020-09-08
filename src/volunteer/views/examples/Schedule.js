import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import ScheduleButton from './ScheduleButtonVol';

require('firebase/auth');
require('firebase/storage');


function Schedule(props) {
  const [available, setAvailable] = useState([]);

  // using this for conversions from UTC to localTime
  const d = new Date();
  const times = [14, 17, 20, 23];
  const days = [1, 2, 3, 4, 5, 6, 7];


  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      let userRef = props.users.doc(user.uid);
      const getDoc = userRef.get().then((doc) => {
        if (doc.exists) {
          setAvailable(doc.data().times);
        } else {
          userRef = props.volunteers.doc(user.uid);
          const getDoc = userRef.get().then((doc) => {
            setAvailable(doc.data().times);
          });
        }
      });
    }
  }, []);

  function scheduleTime(value) {
    const user = firebase.auth().currentUser;
    if (user) {
      let ref = props.users.doc(user.uid);
      if (props.volunteer) {
        ref = props.volunteers.doc(user.uid);
      }

      if (!available.includes(value)) {
        const arrUnion = ref.update({
          times: firebase.firestore.FieldValue.arrayUnion(value),
        });
        setAvailable((available) => [...available, value]);
      } else {
        const arrUnion = ref.update({
          times: firebase.firestore.FieldValue.arrayRemove(value),
        });
        setAvailable(available.filter((e) => e !== value));
      }
    }
  }


  return (
    <div className="buttons" style={{ borderRadius: 20 }}>
      <div className="row">
        <div className="col">
          <h3>Monday</h3>
        </div>
        <div className="col">
          <h3>Tuesday</h3>
        </div>
        <div className="col">
          <h3>Wednesday</h3>
        </div>
        <div className="col">
          <h3>Thursday</h3>
        </div>
        <div className="col">
          <h3>Friday</h3>
        </div>
        <div className="col">
          <h3>Saturday</h3>
        </div>
        <div className="col">
          <h3>Sunday</h3>
        </div>
      </div>
      {times.map((time, row) => (
        <div className="row">
          {days.map((button, col) => (
            <div className="col">
              <ScheduleButton
                schedule={scheduleTime}
                available={available}
                users={props.users}
                row={row}
                col={col}
                time={`${(time - (d.getTimezoneOffset() / 60)) % 12}:00 ${(time - (d.getTimezoneOffset() / 60)) < 12 ? 'AM' : 'PM'}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Schedule;
