import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './styles';

export default class ContinueWith extends Component {
  render() {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              height: 7,
              borderBottomWidth: 1,
              borderBottomColor: colors.text1,
            }}
          />
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 14,
              fontWeight: 'bold',
              color: colors.text1,
            }}>
            or continue with
          </Text>
          <View
            style={{
              flex: 1,
              height: 7,
              borderBottomWidth: 1,
              borderBottomColor: colors.text1,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="facebook-box"
              size={60}
              color="#3b5998"
            />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 20}}>
            <MaterialCommunityIcons
              name="pinterest-box"
              size={60}
              color="#c8232c"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="instagram"
              size={60}
              color={colors.text1}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
