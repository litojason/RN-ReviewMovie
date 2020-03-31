import React, {Component} from 'react';
import {Text, View, Modal, TouchableOpacity, TextInput} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {styles, colors} from '../components/styles';

export default class ModalChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: '',
    };
  }

  handleSubmit = async () => {
    try {
      if (this.state.edit === '') {
        await this.setState({edit: this.props.defaultValue});
      }

      const profile = {
        name: this.state.edit,
        email: this.props.email,
      };

      const response = await axios({
        method: 'put',
        url: 'https://reviewmoviedatabase.herokuapp.com/api/v1/users/update',
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
        data: profile,
      });
      if (response) {
        this.props.reRenderData();
        this.props.setModalChangeProfileVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalChangeProfileVisible}>
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
            <Text style={{fontSize: 24, color: colors.text1}}>Edit Name?</Text>

            <TextInput
              placeholder="Name remain unchange"
              defaultValue={this.props.defaultValue}
              onChangeText={value => this.setState({edit: value})}
              style={{
                width: '100%',
                textAlign: 'center',
                marginVertical: 20,
                paddingHorizontal: 20,
                backgroundColor: colors.text1,
                color: colors.text2,
                fontSize: 20,
                borderRadius: 20,
                elevation: 5,
              }}
            />

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  this.props.setModalChangeProfileVisible(false);
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
                  this.handleSubmit();
                }}
                style={styles.modalButtonContainer}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
