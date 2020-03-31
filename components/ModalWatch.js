import React, {Component} from 'react';
import {Text, View, Modal, Dimensions, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from './styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class ModalWatch extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalWatchVisible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: HEIGHT - 40,
              height: WIDTH - 10,
              transform: [{rotate: '90deg'}],
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.setModalWatchVisible(false)}
              style={{
                zIndex: 2,
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
            <WebView
              style={{zIndex: 1}}
              source={{uri: this.props.trailer}}
              mediaPlaybackRequiresUserAction={false}
              javaScriptEnabled={true}
              scalesPageToFit={true}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
