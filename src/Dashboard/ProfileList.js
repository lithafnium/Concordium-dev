import React, {useState} from 'react';

function ProfileList({currUser,
					  edit,
					  name,
					  age,
					  location,
					  originalLoc,
					  interests,
					  topics,
					  school,
					  setSchool,
					  volunteer,
						language,
					  setName,
					  setAge,
					  setLocation,
						setLanguage,
					  setOriginalLoc,
					  setInterests,
					  setTopics} ){

	return(
				<div className = "container">
				{!edit ?
					<div className = "container">
					<ul className = "infoList">
						<li>
							<p className = "listHeader">Name</p>
							<p className = "listContent">{name}</p>

						</li>
						<li >
							<p className = "listHeader">Age</p>
							<p className = "listContent">{age}</p>
						</li>
						<li>
							<p className = "listHeader">Location</p>
							<p className = "listContent">{location}</p>
						</li>
						{volunteer && <li>
							<p className = "listHeader">School</p>
							<p className = "listContent">{school}</p>
						</li>}
					</ul>
					<ul className = "infoList">
						<li>
							<p className = "listHeader">Where are you from originally?</p>
							<p className = "listContent">{originalLoc}</p>
						</li>
						<li>
							<p className = "listHeader">What language(s) do you speak?</p>
							<p className = "listContent">{language}</p>
						</li>
						<li>
							<p className = "listHeader">Hobbies</p>
							<p className = "listContent">{interests}</p>
						</li>
						<li>
							<p className = "listHeader">What do you want to talk about?</p>
							<p className = "listContent">{topics}</p>
						</li>

					</ul>
					</div>
					:
				<div className = "container">
				<ul className = "infoList">
						<li>
							<p className = "listHeader">Edit Name</p>
							<input placeholder = "Edit Name" onChange = {(e) => setName(e.target.value)}></input>
						</li>
						<li >
							<p className = "listHeader">Edit Age</p>
							<input placeholder = "Edit Age" onChange = {(e) => setAge(e.target.value)}></input>
						</li>
						<li>
							<p className = "listHeader">Edit Location</p>
							<input placeholder = "Edit Location" onChange = {(e) => setLocation(e.target.value)}></input>
						</li>
						{volunteer && <li>
							<p className = "listHeader">Edit School</p>
							<input placeholder = "Edit Location" onChange = {(e) => setSchool(e.target.value)}></input>
						</li>}
					</ul>
					<ul className = "infoList">
						<li>
							<p className = "listHeader">Edit Original Location</p>
							<input placeholder = "Edit original location" onChange = {(e) => setOriginalLoc(e.target.value)}></input>
						</li>
						<li>
							<p className = "listHeader">Edit Language(s) spoken</p>
							<input placeholder = "Edit language(s) spoken" onChange = {(e) => setLanguage(e.target.value)}></input>
						</li>
						<li>
							<p className = "listHeader">Edit Hobbies</p>
							<input placeholder = "Edit Hobbies" onChange = {(e) => setInterests(e.target.value)}></input>
						</li>
						<li>
							<p className = "listHeader">Edit Topics</p>
							<input placeholder = "Edit Topics" onChange = {(e) => setTopics(e.target.value)}></input>
						</li>

					</ul>
					</div>

				}
		</div>

	);
}

export default ProfileList
