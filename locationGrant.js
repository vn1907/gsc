import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, View, Text, Button } from 'react-native';

const LocationPermission = () => {
  const [permissionStatus, setPermissionStatus] = useState('');

  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission Required',
            message:
              'This app needs access to your location ' +
              'so we can know where you are.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setPermissionStatus('Location permission granted.');
        } else {
          setPermissionStatus('Location permission denied.');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    checkLocationPermission();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{permissionStatus}</Text>
    </View>
  );
};

export default LocationPermission;
