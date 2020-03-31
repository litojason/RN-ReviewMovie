import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import {colors} from './styles';

export default class MakerCard extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.navigation}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
        }}>
        <Image
          source={{uri: this.props.photo}}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            resizeMode: 'cover',
          }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: colors.text3,
            textAlign: 'center',
          }}>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}
