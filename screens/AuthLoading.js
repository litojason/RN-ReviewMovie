import React from 'react';
import {StatusBar, View} from 'react-native';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoading extends React.Component {
  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    this.props.navigation.navigate(token ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Loading />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
