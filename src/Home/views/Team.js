import React from 'react';
import Navbar from '../components/Navbar';
import {
  SplashScreen, Statistics, Advisors, Footer, Information,
  Partners,
} from '../components';

export default function Team() {
  const people1 = [
    {
      name: 'Prasidh Chhabria',
      title: 'Co-Founder and Director',
      image: require('../../assets/home/people/team/image1.jpeg'),
    },
    {
      name: 'Anagha Kumar',
      title: 'Co-Founder and Director',
      image: require('../../assets/home/people/team/image0.jpeg'),
    },
    {
      name: 'Steve Li',
      title: 'Technology Lead',
      image: require('../../assets/home/people/team/IMG-6432.JPG'),
    },
    {
      name: 'Rohan Minocha',
      title: 'Development Lead',
      image: require('../../assets/home/people/team/rohan.jpg'),
    },
  ];


  const people2 = [
    {
      name: 'Do Yeon Kim',
      title: 'Elderly Outreach Coordinator',
      image: require('../../assets/home/people/team/doYeon.JPG'),
    },
    {
      name: 'Rahul Guda',
      title: 'Volunteer Recruitment Head',
      image: require('../../assets/home/people/team/rahul.jpg'),
    },
    {
      name: 'Anna Peters',
      title: 'Volunteer Coordinator',
      image: require('../../assets/home/people/team/anna.jpeg'),
    },
    {
      name: 'Sophia Liang',
      title: 'Volunteer Coordinator',
      image: require('../../assets/home/people/team/sophia.JPG'),
    },
  ];

  const people3 = [
    {
      name: 'Allegra Rollo',
      title: 'COVID-19 Task Force Co-Director',
      image: require('../../assets/home/people/team/AllegraR.jpg'),
    },
    {
      name: 'Campbell Erickson',
      title: 'COVID-19 Task Force Co-Director',
      image: require('../../assets/home/people/team/CampbellE.jpg'),
    },
    {
      name: 'Sophie Sun',
      title: 'Volunteer Outreach Coordinator',
      image: require('../../assets/home/people/team/SophieS.jpg'),
    },
    {
      name: 'Isaac Longobardi',
      title: 'Elderly Outreach Coordinator',
      image: require('../../assets/home/people/team/IsaacL.jpg'),
    },
  ];

  const people4 = [
    {
      name: 'Abby Fennelly',
      title: 'Elderly Outreach Coordinator',
      image: require('../../assets/home/people/team/AbbyF.png'),
    },
    {
      name: 'Phoebe Mugford',
      title: 'Summer 2020 Intern',
      image: require('../../assets/home/people/team/phoebe.jpeg'),
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
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900">OUR TEAM</h1>
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

            { people3.map((item) => (
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

            { people4.map((item) => (
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
