import React from 'react';
import Partner from '../Partner';

export default function Partners() {
  return (
    <>
      <div className="expanded landing__section">
        <div className="container">


          <div id="team" className="home-container">
            <div className="team" style={{}}>
              <h1 style={{
                textAlign: 'center',
                fontWeight: '400',
              }}
              >
                Our Partners
              </h1>
              <div className="members">
                <Partner
                  name="Harvard Innovation Labs"
                  imgsrc={require('../../assets/home/partners/ilabs.jpg')}
                  leader
                />

                <Partner
                  name="The Clinton Foundation"
                  imgsrc={require('../../assets/home/partners/clinton.png')}
                  leader
                />
                <Partner
                  name="The Dear Loneliness Project"
                  // role="Co-Founder and Director"
                  imgsrc={require('../../assets/home/partners/dearloneliness.png')}
                  leader
                />

                <Partner
                  name="AARP"
                  imgsrc={require('../../assets/home/partners/aarp.jpg')}
                  leader
                />
              </div>


            </div>
          </div>

        </div>
      </div>
    </>
  );
}
