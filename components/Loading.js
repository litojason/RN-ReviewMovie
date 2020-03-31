import React, {Component} from 'react';
import {View, Modal, ActivityIndicator, Dimensions} from 'react-native';
import {colors} from '../components/styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class Loading extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.loadingVisible}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: WIDTH,
            height: HEIGHT,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.blackBg,
          }}>
          <ActivityIndicator
            size={100}
            animating={this.props.loadingVisible}
            color={colors.text1}
          />
        </View>
      </Modal>
    );
  }
}
