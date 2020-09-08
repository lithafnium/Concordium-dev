import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";


import { Button, Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header bg-gradient-info pb-8 pt-5 pt-md-8"
          style={{
            minHeight: "600px",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">{this.props.name}</h1>
                {/*<p className="text-white mt-0 mb-5">*/}
                {/*  This is your profile page which houses all information that will be */}
                {/*  presented to a senior upon match*/}
                {/*</p>*/}
                  <Link to="edit_profile"
                        spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}>
                   	 <Button
                  		color="info"
                  		onClick={e => e.preventDefault()}
                		>
                  	Edit Profile
                		</Button>
                	</Link>

              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
