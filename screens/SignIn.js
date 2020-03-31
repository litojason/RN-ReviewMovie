import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

import {styles, colors} from '../components/styles';
import ContinueWith from '../components/ContinueWith';
import PasswordInput from '../components/PasswordInput';
import Loading from '../components/Loading';
import ModalError from '../components/ModalError';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: false,
      alertVisible: false,
      isError: false,
      email: '',
      password: '',
    };
    this.a = React.createRef();
  }

  setLoadingVisible = visible => {
    this.setState({loadingVisible: visible});
  };

  setAlertVisible = visible => {
    this.setState({alertVisible: visible});
  };

  getUser = async (email, password) => {
    this.setLoadingVisible(true);
    let user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios({
        method: 'post',
        url: 'https://reviewmoviedatabase.herokuapp.com/api/v1/users/login',
        data: user,
      });
      if (response) {
        this.signInAsync(response.data.data);
        this.setLoadingVisible(false);
      }
    } catch (error) {
      console.log(error);
      this.setLoadingVisible(false);
      this.setAlertVisible(true);
    }
  };

  signInAsync = async token => {
    await AsyncStorage.setItem('token', 'Bearer ' + token);
    this.props.navigation.navigate('App');
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.bgColor1,
            padding: 20,
            alignItems: 'center',
          }}>
          <Loading loadingVisible={this.state.loadingVisible} />
          <ModalError
            title="Failed to Sign In"
            description="Cannot find user."
            alertVisible={this.state.alertVisible}
            setAlertVisible={this.setAlertVisible}
          />

          <Text
            style={{
              fontSize: 24,
              color: colors.text3,
              marginBottom: 20,
            }}>
            Sign In
          </Text>

          <View
            style={{
              width: '100%',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.bgColor1,
              elevation: 10,
            }}>
            <TextInput
              ref={this.a}
              placeholder="Email"
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => {
                this.b.focus();
              }}
              onEndEditing={value =>
                this.setState({email: value.nativeEvent.text})
              }
              blurOnSubmit={false}
              style={styles.textInput}
            />

            <PasswordInput
              errorColor={colors.text1}
              inputRef={ref => (this.b = ref)}
              placeholder="Password"
              inputOnEndEditing={value =>
                this.setState({password: value.nativeEvent.text})
              }
            />

            <TouchableOpacity
              onPress={() =>
                this.getUser(this.state.email, this.state.password)
              }
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <Text style={{fontSize: 16, color: colors.text3}}>
                Do not have an account?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text
                  style={{
                    marginLeft: 3,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.text1,
                  }}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <ContinueWith />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
