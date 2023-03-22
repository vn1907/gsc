import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default class CurrentLocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
            title={'You are here!'}
          />
        </MapView>
        <Text style={styles.text}>Latitude: {this.state.latitude}</Text>
        <Text style={styles.text}>Longitude: {this.state.longitude}</Text>
        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  error: {
    position: 'absolute',
    top: 10,
    right: 10,
    color: '#fff',
    backgroundColor: 'transparent',
  },
});