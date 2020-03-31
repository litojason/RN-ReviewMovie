import React, {Component} from 'react';
import {Text, View, Modal, TouchableOpacity} from 'react-native';

import {styles, colors} from '../components/styles';

export default class ModalDeleteReview extends Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalDeleteReviewVisible}>
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
                fontSize: 20,
                textAlign: 'center',
                color: colors.text1,
                marginTop: 10,
                marginBottom: 20,
                letterSpacing: 1,
              }}>
              Remove your review?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.setModalDeleteReviewVisible(false);
                }}
                style={[
                  styles.modalButtonContainer,
                  {backgroundColor: colors.grey},
                ]}>
                <Text style={[styles.modalButtonText, {color: colors.white}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.deleteReviews();
                  this.props.setModalDeleteReviewVisible(false);
                }}
                style={styles.modalButtonContainer}>
                <Text style={styles.modalButtonText}>Okay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
