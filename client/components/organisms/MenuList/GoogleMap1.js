import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { GoogleMap } from '@react-google-maps/api';
import Marker from './Marker';


class GoogleMap1 extends Component {

  
  static defaultProps = {
    
    center: {
      lat: 12.31,
      lng: 12.31
    },
    zoom: 11
  };

  // componentDidMount() {
  //   //   setTimeout(() => {
  //   //     this.setState({ productList: productList });
  //   //   }, 1000);
  //   fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.address}&key=AIzaSyDOlTzWL8Eo2ijHa--q9edXVPIwU19GQys`)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         console.log('Rss ', result)
  //         this.setState({
  //           // isLoaded: true,

  //         })
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           // isLoaded: true,
  //           // error,
  //         })
  //       }
  //     )
  // }


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
{       console.log("&&& ",this)}
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDOlTzWL8Eo2ijHa--q9edXVPIwU19GQys" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={this.lat}
            lng={this.lng}
            name="Restaurant Location"
            color="blue"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap1;