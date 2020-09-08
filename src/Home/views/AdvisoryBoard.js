import React from 'react';
import Navbar from '../components/Navbar';
import {
  SplashScreen, Statistics, Advisors, Footer, Information,
  Partners,
} from '../components';

export default function AdvisoryBoard() {
  const people1 = [
    {
      name: 'Jeff Robbins',
      title: "Seniors Social Worker and Lecturer in Neurobiology, Brigham and Women's Hospital",
      image: require('../../assets/home/people/advisors/jeffrobbins.jpg'),
    },
    {
      name: 'Kasley Killam',
      title: 'Consultant, MPH, Social Health Expert',
      image: require('../../assets/home/people/advisors/killam.png'),
    },
    {
      name: 'Cynthia King Vance',
      title: 'Adjunct Professor of Entrepreneurship and Strategic advisor to the President, Hunter College',
      image: require('../../assets/home/people/advisors/cynthiakingvance.jpg'),
    },
    {
      name: 'Jennifer Jordan',
      title: 'Member, Board of Directors, MIT Enterprise Forum Cambridge; Mentor-in-Residence, Techstars',
      image: require('../../assets/home/people/advisors/jenniferjordan.png'),
    },
  ];


  const people2 = [
    {
      name: 'Sandra Harris',
      title: 'State President, AARP- MA',
      image: require('../../assets/home/people/advisors/sandraharris.jpeg'),
    },
  ];

  const partners = [
    {
      name: 'The Dear Loneliness Project',
      title: '',
      image: require('../../assets/home/partners/dear.png'),
    },
    {
      name: 'The Clinton Foundation',
      title: '',
      image: require('../../assets/home/partners/clinton.png'),
    },
    {
      name: 'Harvard Innovation Labs',
      title: '',
      image: require('../../assets/home/partners/ilabs.jpg'),
    },
    {
      name: 'AARP',
      title: '',
      image: require('../../assets/home/partners/aarpsq.png'),
    },
  ];


  const renderPeople = () => {
    people1.map((item) => (
      <div className="p-4 lg:w-1/4 md:w-1/2">
        <div className="h-full flex flex-col items-center text-center">
          <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={item.image} />
          <div className="w-full">
            <h2 className="title-font font-medium text-lg text-gray-900">{item.name}</h2>
            <h3 className="text-gray-500 mb-3">{item.title}</h3>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="home">
        <Navbar />
      </div>
      <section className="text-gray-700 body-font pt-20">
        <div className="container px-5 pt-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">ADVISORS</h1>
          </div>
          <div className="flex flex-wrap -m-4">

            { people1.map((item) => (
              <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={item.image} />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">{item.name}</h2>
                    <h3 className="text-gray-500 mb-3">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap -m-4">

            { people2.map((item) => (
              <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={item.image} />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">{item.name}</h2>
                    <h3 className="text-gray-500 mb-3">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">OUR PARTNERS</h1>
          </div>
          <div className="flex flex-wrap -m-4">

            { partners.map((item) => (
              <div className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={item.image} />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">{item.name}</h2>
                    <h3 className="text-gray-500 mb-3">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="home">
        <Footer />
      </div>
    </div>
  );
}
