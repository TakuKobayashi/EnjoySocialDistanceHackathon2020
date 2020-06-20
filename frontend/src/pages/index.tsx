import * as React from 'react'
import { Link } from 'gatsby'
import { Button } from 'react-rainbow-components'
import axios from 'axios';

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import GoogleMapReact from 'google-map-react'

const Video = require('twilio-video')

interface PageProps {
}

class IndexPage extends React.Component<PageProps> {
  constructor(props: any) {
    super(props)
    this.state = {
    }

    axios.get(`https://wenge-boar-5316.twil.io/video-token`).then(response => {
      const token = response.data.token;

      Video.connect(token, { name: 'VideoRoom' }).then(room => {
        console.log('Connected to Room "%s"', room.name);
      
        room.participants.forEach(this.participantConnected);
        room.on('participantConnected', this.participantConnected);
      
        room.on('participantDisconnected', this.participantDisconnected);
        room.once('disconnected', error => room.participants.forEach(this.participantDisconnected));
      });
    })
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <IndexLayout>
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCRLS3ix23lZgFjr-1NxTRdV4D_soSXt1g" }}
            defaultCenter={{
              lat: 35.8447475,
              lng: 139.6450691
            }}
            defaultZoom={18}
          >
          </GoogleMapReact>
          </div>
      </IndexLayout>
    )
  }
  
  participantConnected(participant: any): void {
    console.log('Participant "%s" connected', participant.identity);
    console.log(participant);
  
    participant.on('trackSubscribed', (track) => {
      console.log("subscribed");
      console.log(track);
      track.attach()
    });
    participant.on('trackUnsubscribed', (track) => {
      console.log("unsubscribed");
      console.log(track);
      track.detach()
    });
  
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        console.log("publication subscribed");
        console.log(publication);
        publication.track.attach()
      }
    });
  }
  
  participantDisconnected(participant: any): void {
    console.log('Participant "%s" disconnected', participant.identity);
    console.log(participant);
  }
}

export default IndexPage
