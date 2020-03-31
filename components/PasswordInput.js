import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles, colors} from './styles';

export default class PasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePassword: true,
    };
  }

  handleShow = () => {
    this.setState({hidePassword: !this.state.hidePassword});
  };

  render() {
    return (
      <View style={{width: '100%'}}>
        <TextInput
          placeholder={this.props.placeholder}
          placeholderTextColor={colors.grey}
          secureTextEntry={this.state.hidePassword}
          style={[styles.textInput, {borderColor: this.props.errorColor}]}
          returnKeyType="next"
          blurOnSubmit={this.props.inputBlurOnSubmit}
          ref={this.props.inputRef}
          onSubmitEditing={this.props.inputOnSubmitEditing}
          onEndEditing={this.props.inputOnEndEditing}
        />

        <TouchableOpacity
          onPress={this.handleShow}
          style={{position: 'absolute', top: 10, right: 10}}>
          {this.state.hidePassword ? (
            <MaterialCommunityIcons
              name="eye-off-outline"
              size={30}
              color={colors.text1}
            />
          ) : (
            <MaterialCommunityIcons
              name="eye-outline"
              size={30}
              color={colors.text1}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}
