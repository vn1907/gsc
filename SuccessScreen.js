import React from 'react';
import {Text, View} from 'react-native';

const SuccessScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Successfully updated!</Text>
    </View>
  );
};
export default SuccessScreen;