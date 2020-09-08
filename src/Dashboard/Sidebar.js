import React from 'react';
import {MdPerson,
MdVideocam 
} from 'react-icons/md'; 
import { IconContext } from "react-icons";


function Sidebar(){

	return(
		<div className = "nav-wrapper">
		<div className = "sidebar">
			<ul>
				<li className = "">
					<p className = "username">Steve Li</p>

				</li>
				<li className = "list-item">
					<IconContext.Provider value={{ size: "1.5em", className: 'react-icons' }}>
						<span id = "profile" className = "list-icon">
							<MdPerson/>
						</span>
						<span>Profile</span>
					</IconContext.Provider>

				</li>
				<li className = "list-item">
					<IconContext.Provider value={{ size: "1.5em", className: 'react-icons' }}>

						<span id = "video" className = "list-icon">
							<MdVideocam/>
						</span>
						<span>Video Feed</span>
					</IconContext.Provider>

				</li>
			</ul>
		</div>
		</div>
	); 
}

export default Sidebar; 