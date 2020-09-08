import React from 'react';
import Leader from '../../Leader';

const Team = () => (
  <div id="team" className="home-container">
    <div className="team">
      <h1 style={{
        textAlign: 'center',
        fontWeight: '400',
      }}
      >
        Our Team
      </h1>
      <div className="members">
        <div className="members">
          <Leader
            name="Prasidh Chhabria"
            role="Co-Founder and Director"
            imgsrc={require('../../../assets/home/people/team/image1.jpeg')}
            leader
            url="https://www.linkedin.com/in/prasidhc"
          />
          <Leader
            name="Anagha Kumar"
            role="Co-Founder and Director"
            imgsrc={require('../../../assets/home/people/team/image0.jpeg')}
            leader
            url="https://www.linkedin.com/in/anagha-kumar-b3553217a/"
          />
        </div>

        <div className="members">
          <Leader
            name="Steve Li"
            role="Technology Lead"
            imgsrc={require('../../../assets/home/people/team/IMG-6432.JPG')}
            leader
            url="https://www.linkedin.com/in/steveshenli/"
          />
          <Leader
            name="Rohan Minocha"
            role="Development Lead"
            imgsrc={require('../../../assets/home/people/team/rohan.jpg')}
            leader
            url="https://theconcordium.org/"
          />
        </div>

        <div className="members">
          <Leader
            name="Do Yeon Kim"
            role="Elderly Outreach Coordinator"
            imgsrc={require('../../../assets/home/people/team/doYeon.JPG')}
            leader
            url="https://theconcordium.org/"
          />
          <Leader
            name="Rahul Guda"
            role="Volunteer Recruitment Head"
            imgsrc={require('../../../assets/home/people/team/rahul.jpg')}
            leader
            url="https://theconcordium.org/"
          />
        </div>

        <div className="members">
          <Leader
            name="Anna Peters"
            role="Volunteer Coordinator"
            imgsrc={require('../../../assets/home/people/team/anna.jpeg')}
            leader
            url="https://theconcordium.org"
          />
          <Leader
            name="Sophia Liang"
            role="Volunteer Coordinator"
            imgsrc={require('../../../assets/home/people/team/sophia.JPG')}
            leader
            url="https://theconcordium.org/"
          />
        </div>

        <div className="members">
          <Leader
            name="Allegra Rollo"
            role="COVID-19 Task Force Co-Director"
            imgsrc={require('../../../assets/home/people/team/AllegraR.jpg')}
            leader
            url="#"
          />
          <Leader
            name="Campbell Erickson"
            role="COVID-19 Task Force Co-Director"
            imgsrc={require('../../../assets/home/people/team/CampbellE.jpg')}
            leader
            url="#"
          />
        </div>

        <div className="members">
          <Leader
            name="Sophie Sun"
            role="Volunteer Outreach Coordinator"
            imgsrc={require('../../../assets/home/people/team/SophieS.jpg')}
            leader
            url="#"
          />
          <Leader
            name="Isaac Longobardi"
            role=" Elderly Outreach Coordinator"
            imgsrc={require('../../../assets/home/people/team/IsaacL.jpg')}
            leader
            url="https://theconcordium.org/"
          />
          <Leader
            name="Abby Fennelly"
            role=" Elderly Outreach Coordinator"
            imgsrc={require('../../../assets/home/people/team/AbbyF.png')}
            leader
            url="https://theconcordium.org/"
          />
        <Leader
            name="Phoebe Mugford"
            role="Summer 2020 Intern"
            imgsrc={require('../../../assets/home/people/team/phoebe.jpeg')}
            leader
            url="https://theconcordium.org/"
          />
        </div>


      </div>


    </div>
  </div>
);

export default Team;
