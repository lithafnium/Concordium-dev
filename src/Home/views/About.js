import React from 'react';
import Navbar from '../components/Navbar';
import {
  SplashScreen, Statistics, Advisors, Team, Footer, Information,
  Partners,
} from '../components';


export default function About() {
  return (
    <div className="home">
      <Navbar />
      <div style={{ paddingTop: 120 }}>
        <Statistics />
        <Information />
        <Footer />
      </div>

    </div>
  );
}
