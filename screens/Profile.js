import React, {Component} from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';

import {styles, colors} from '../components/styles';
import PasswordInput from '../components/PasswordInput';
import Loading from '../components/Loading';
import ModalChangeProfile from '../components/ModalChangeProfile';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingVisible: true,
      modalChangeProfileVisible: false,
      token: '',
      image: '',
      isConfirmed: false,
      userId: '',
      name: '',
      email: '',
    };
  }

  setLoadingVisible = visible => {
    this.setState({loadingVisible: visible});
  };

  setModalChangeProfileVisible = visible => {
    this.setState({modalChangeProfileVisible: visible});
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      this.setLoadingVisible(true);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        this.setState({token: token});
      }
      const user = await axios({
        method: 'get',
        url:
          'https://reviewmoviedatabase.herokuapp.com/api/v1/users/currentUser',
        headers: {
          Authorization: this.state.token,
        },
      });
      if (user) {
        this.setState({
          image: {
            uri: user.data.data.image,
          },
        });
        this.setState({isConfirmed: user.data.data.isConfirmed});
        this.setState({userId: user.data.data._id});
        this.setState({name: user.data.data.name});
        this.setState({email: user.data.data.email});
        this.setLoadingVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleChooseImage = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setLoadingVisible(true);
        this.setState({image: response});
        this.handleChangeImage();
      }
    });
  };

  handleChangeImage = async () => {
    try {
      const form = new FormData();

      await form.append('image', {
        uri: this.state.image.uri,
        name: this.state.image.fileName,
        type: this.state.image.type,
      });

      const response = await axios({
        method: 'put',
        url:
          'https://reviewmoviedatabase.herokuapp.com/api/v1/users/uploadPhoto',
        headers: {
          Authorization: this.state.token,
          'Content-Type': 'multipart/form-data',
        },
        data: form,
      });

      if (response) {
        console.log('success upload');
        this.getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    const {image} = this.state;

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          paddingTop: 50,
          alignItems: 'center',
          backgroundColor: colors.bgColor1,
        }}>
        <Loading loadingVisible={this.state.loadingVisible} />
        <ModalChangeProfile
          modalChangeProfileVisible={this.state.modalChangeProfileVisible}
          setModalChangeProfileVisible={this.setModalChangeProfileVisible}
          defaultValue={this.state.name}
          email={this.state.email}
          reRenderData={this.getData}
        />
        <View
          style={{
            width: 200,
            height: 200,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 100,
          }}>
          <TouchableOpacity onPress={() => this.handleChooseImage()}>
            <Image
              source={{uri: image.uri}}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                resizeMode: 'cover',
                marginBottom: 50,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 70,
                right: 10,
                padding: 5,
                borderRadius: 25,
                backgroundColor: colors.bgColor2,
              }}>
              <MaterialCommunityIcons
                name="camera"
                size={40}
                color={colors.text2}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 30,
            padding: 20,
            borderRadius: 10,
            backgroundColor: colors.bgColor1,
            elevation: 10,
          }}>
          <View>
            <Text style={{fontSize: 20, color: colors.text3}}>
              {this.state.name}
            </Text>
            <Text style={{fontSize: 20, color: colors.text3}}>
              {this.state.email}
            </Text>
            {!this.state.isConfirmed && (
              <Text style={{fontSize: 20, color: colors.text1}}>
                Please confirm your email
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setModalChangeProfileVisible(true);
            }}>
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color={colors.text1}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={this.signOutAsync}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
