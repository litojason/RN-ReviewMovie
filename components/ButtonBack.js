import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from './styles';

export default class ButtonBack extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.props.navigation}
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.bgColor2,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={30}
          color={colors.text2}
        />
      </TouchableOpacity>
    );
  }
}
