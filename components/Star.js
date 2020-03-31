import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {colors} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Star extends Component {
  render() {
    return (
      <MaterialCommunityIcons
        name={this.props.filled ? 'star' : 'star-outline'}
        size={24}
        color={colors.yellow}
      />
    );
  }
}
