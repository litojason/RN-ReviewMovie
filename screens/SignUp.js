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

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: false,
      alertVisible: false,
      name: '',
      email: '',
      password: '',
      password2: '',
      isError1: true,
      isError2: true,
      isError3: true,
      isError4: true,
      error: '',
    };

    this.a = React.createRef();
    this.b = React.createRef();
  }

  setLoadingVisible = visible => {
    this.setState({loadingVisible: visible});
  };

  setAlertVisible = visible => {
    this.setState({alertVisible: visible});
  };

  handleName = name => {
    if (name.length < 3 || name.length > 32) {
      this.setState({
        error: 'Name must be between 3 - 32',
        isError1: true,
      });
    } else {
      this.setState({name: name, isError1: false, error: ''});
    }
  };

  handleEmail = email => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    if (!regex.test(email)) {
      this.setState({
        error: 'Invalid email format',
        isError2: true,
      });
    } else {
      this.setState({email: email, isError2: false, error: ''});
    }
  };

  handlePassword = password => {
    if (password.length < 8) {
      this.setState({
        error: 'Password must be at least 8',
        isError3: true,
      });
    } else {
      this.setState({password: password, isError3: false, error: ''});
    }
  };

  handleReEnter = password2 => {
    if (password2 !== this.state.password) {
      this.setState({
        error: 'Different password',
        isError4: true,
      });
    } else {
      this.setState({isError4: false, error: ''});
    }
  };

  handleSignUp = async event => {
    event.preventDefault();
    this.setLoadingVisible(true);
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    try {
      const response = await axios({
        method: 'post',
        url: 'https://reviewmoviedatabase.herokuapp.com/api/v1/users/register',
        data: user,
      });
      if (response) {
        console.log(response);
        this.signUpAsync(response.data.data.token);
        this.setLoadingVisible(false);
      }
    } catch (error) {
      console.log(error);
      this.setLoadingVisible(false);
      this.setAlertVisible(true);
    }
  };

  signUpAsync = async token => {
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
            title="Failed to Sign Up"
            description={`Check whether the inputs meet all requirements\nor\nEmail has already registered.`}
            alertVisible={this.state.alertVisible}
            setAlertVisible={this.setAlertVisible}
          />

          <Text
            style={{
              fontSize: 24,
              color: colors.text3,
            }}>
            Sign Up
          </Text>

          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: colors.grey,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {this.state.error}
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
              placeholder="Name"
              returnKeyType="next"
              onEndEditing={value => this.handleName(value.nativeEvent.text)}
              onSubmitEditing={() => {
                this.b.current.focus();
              }}
              blurOnSubmit={false}
              style={[
                styles.textInput,
                {
                  borderColor: this.state.isError1 ? colors.grey : colors.green,
                },
              ]}
            />
            <TextInput
              ref={this.b}
              placeholder="Email"
              keyboardType="email-address"
              returnKeyType="next"
              onEndEditing={value => this.handleEmail(value.nativeEvent.text)}
              onSubmitEditing={() => {
                this.c.focus();
              }}
              blurOnSubmit={false}
              style={[
                styles.textInput,
                {
                  borderColor: this.state.isError2 ? colors.grey : colors.green,
                },
              ]}
            />
            <PasswordInput
              errorColor={this.state.isError3 ? colors.grey : colors.green}
              inputRef={ref => (this.c = ref)}
              placeholder="Password"
              marginVertical={20}
              inputBlurOnSubmit={false}
              inputOnEndEditing={value =>
                this.handlePassword(value.nativeEvent.text)
              }
              inputOnSubmitEditing={() => {
                this.d.focus();
              }}
            />
            <PasswordInput
              errorColor={this.state.isError4 ? colors.grey : colors.green}
              inputRef={ref => (this.d = ref)}
              placeholder="Re-enter password"
              inputOnEndEditing={value => {
                this.handleReEnter(value.nativeEvent.text);
              }}
            />

            <TouchableOpacity
              onPress={this.handleSignUp}
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <Text style={{fontSize: 16, color: colors.text3}}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Text
                  style={{
                    marginLeft: 3,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: colors.text1,
                  }}>
                  Sign In
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
