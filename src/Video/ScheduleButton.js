import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

require('firebase/auth');
require('firebase/storage');

function ScheduleButton({
  schedule, available, users, row, col, time,
}) {
  const [active, toggleActive] = useState(false);

  useEffect(() => {
  }, []);

  function scheduleTime(value) {
    schedule(value);
    toggleActive(!active); // available.includes(row * 7 + col) ||
  }
  return (
    <button className={available.includes(row * 7 + col) ? 'activeButton' : null} onClick={() => scheduleTime(row * 7 + col)}>
      {time}
    </button>
  );
}

export default ScheduleButton;
