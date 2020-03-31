import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {styles, colors} from '../components/styles';

const HEIGHT = Dimensions.get('window').height;

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.animation1 = new Animated.Value(0);
    this.animation2 = new Animated.Value(0);
    this.animation3 = new Animated.Value(0);
    this.animation4 = new Animated.Value(0);
  }

  componentDidMount = () => {
    Animated.sequence([
      Animated.timing(this.animation1, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.timing(this.animation2, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.timing(this.animation3, {
        toValue: 1,
        duration: 1000,
      }),
      Animated.timing(this.animation4, {
        toValue: 1,
        duration: 1000,
      }),
    ]).start();
  };

  render() {
    const spinAnimation = this.animation1.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '1080deg'],
    });
    const scaleAnimation = this.animation1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 250],
    });
    const textOpacity = this.animation2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const iconScale = this.animation3.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.5],
    });
    const iconPosition = this.animation3.interpolate({
      inputRange: [0, 1],
      outputRange: [HEIGHT / 3.5, -50],
    });
    const welcomeOpacity = this.animation4.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgColor1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: iconPosition,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{scale: iconScale}],
          }}>
          <Animated.Image
            source={require('../assets/icon.png')}
            style={{
              width: scaleAnimation,
              height: scaleAnimation,
              resizeMode: 'cover',
              transform: [{rotate: spinAnimation}],
            }}
          />
          <Animated.Text
            style={{fontSize: 40, color: colors.text3, opacity: textOpacity}}>
            MilanTV
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 200,
            left: 20,
            right: 20,
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.bgColor1,
            elevation: 10,
            opacity: welcomeOpacity,
          }}>
          <Text
            style={{
              fontSize: 48,
              color: colors.text1,
              letterSpacing: 2,
            }}>
            Welcome
          </Text>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 20,
              fontSize: 24,
              color: colors.text1,
              letterSpacing: 2,
            }}>
            A Place to REVIEW your favorite movies.
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}
            style={[styles.buttonContainer, {marginVertical: 20}]}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={styles.buttonContainer}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SignIn')}
            style={[
              styles.buttonContainer,
              {
                marginTop: 20,
                backgroundColor: colors.bgColor1,
                borderWidth: 3,
                borderColor: colors.bgColor2,
              },
            ]}>
            <Text style={[styles.buttonText, {color: colors.text1}]}>
              CONTINUE AS GUEST
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
}
