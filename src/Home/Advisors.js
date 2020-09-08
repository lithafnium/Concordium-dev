import React from 'react'
import Leader from './Leader';

const Advisors = () => {

    return(
        <div id = "advisoryboard" className = "home-container">
            <div className = "team">
                <h1 style = {{textAlign: "center",
                              fontWeight: "400"}}>Advisors</h1>
                <div className = "members">
                    {/* <Leader leader = {false}  url = "https://joelsalinasmd.com/" name = "Joel Salinas" role = "Assistant Professor Neurology, Harvard Medical school" imgsrc = "/joelsalinas.jpg"/> */}
                    <Leader leader = {false}  url = "https://connects.catalyst.harvard.edu/Profiles/display/Person/30097" name = "Jeff Robbins" role = "Seniors Social Worker and Lecturer in Neurobiology, Brigham and Women's Hospital" imgsrc = "/jeffrobbins.jpg"/>
                    <Leader leader = {false}  url = "https://www.linkedin.com/in/cynthiakingvance/"  name = "Cynthia King Vance" role = "Adjunct Professor of Entrepreneurship and Strategic advisor to the President, Hunter College" imgsrc = "/cynthiakingvance.jpg"/>
                </div>
                <div className = "members">
                    <Leader leader = {false}  url = "https://entrepreneurship.mit.edu/profile/jennifer-jordan/" name = "Jennifer Jordan" role = "Member, Board of Directors, MIT Enterprise Forum Cambridge; Mentor-in-Residence, Techstars" imgsrc = "/jenniferjordan.png"/>
                    <Leader leader = {false}  url = "https://states.aarp.org/massachusetts/aarp-massachusetts-names-sandra-harris-as-state-president" name = "Sandra Harris" role = "State President, AARP- MA" imgsrc = "/sandraharris.jpeg"/>
                </div>


            </div>
        </div>
    )
}

export default Advisors
