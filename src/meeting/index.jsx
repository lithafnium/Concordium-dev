import React from 'react';
import * as Cookies from 'js-cookie';

import './meeting.css';
import './index.css';
// import { AGORA_APP_ID } from "../agora.config"

class Meeting extends React.Component {
  constructor(props) {
    super(props);


    this.videoProfile = '480p_4';
    // this.channel = token;
    this.transcode = Cookies.get('transcode') || 'interop';
    this.attendeeMode = Cookies.get('attendeeMode') || 'video';
    this.baseMode = Cookies.get('baseMode') || 'avc';
    this.state = { appID: '', channel: '', isLoading: true };

    // if (!this.appId) {
    //   return alert("Get App ID first!");
    // }
    this.uid = undefined;
  }

  async componentDidMount() {
    try {
      const call = await fetch(
        'https://theconcordium.org/app/api/app-id',
      );

      const queryString = window.location.search;
      console.log(this.props);
      const urlParams = new URLSearchParams(queryString);
      const token = urlParams.get('token');

      console.log(token);

      const id = await call.json();
      console.log(id.id);
      console.log(id);
      this.setState({ appID: id.id, channel: token, isLoading: false });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { isLoading, appID, channel } = this.state;
    console.log(this.channel);

    // console.log(this.state)
    if (!isLoading) {
      return (
        <div className="meeting">
          <div className="wrapper meeting">
            <div className="ag-header">
              <div className="ag-header-lead">
                <span>The Concordium</span>
              </div>
              <div className="ag-header-msg">
                Room:&nbsp;
                <span id="room-name">{channel}</span>
              </div>
            </div>
            <div className="ag-main">
              <div className="ag-container">
              </div>
            </div>
            <div className="ag-footer">
              <a className="ag-href">
                <span>The Concordium</span>
              </a>
              <span>team@theconcordium.org</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div/>
    );
  }
}

export default Meeting;
