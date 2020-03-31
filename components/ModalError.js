import React, {Component} from 'react';
import {Text, View, StyleSheet, Modal, TouchableOpacity} from 'react-native';

import {colors} from '../components/styles';

export default class ModalError extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.alertVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.blackBg,
          }}>
          <View
            style={{
              width: '80%',
              padding: 20,
              borderRadius: 20,
              backgroundColor: colors.bgColor1,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 7,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                color: colors.text1,
              }}>
              {this.props.title}
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                color: colors.text1,
                marginTop: 10,
                marginBottom: 20,
              }}>
              {this.props.description}
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.props.setAlertVisible(false);
              }}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>OKAY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.text1,
    borderRadius: 30,
    width: '40%',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text2,
  },
});
