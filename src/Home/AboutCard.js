import React from 'react';

const AboutCard = ({imgsrc, text, left, title, subtitle}) => {
    return(
        <div>

            <h1 className="about-title">{title}</h1>
        <h3 className="about-subtitle">{subtitle}</h3>

            {left ? <div className = {"about-card " + (left ? "translate-left" : "translate-right")}>
                  
                    <img src = {imgsrc}/>
                        
                </div> : 
                <div className = {"about-card " + (left ? "translate-left" : "translate-right")}>    
                    <div className = "about-section">
                        {/* <h2 className = "about-title">{props.title}</h2> */}
                        <p>{text}</p>
                    </div> 
                    {/* <img src = {imgsrc}/> */}
            </div> }
           
        </div>
    ); 
}

export default AboutCard; 