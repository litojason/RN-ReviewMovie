import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';

export default class Icon extends Component {
  render() {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../assets/icon.png')}
          style={{width: 60, height: 40, resizeMode: 'contain'}}
        />
        <Text style={{fontSize: 20, color: 'black'}}>MilanTV</Text>
      </View>
    );
  }
}
