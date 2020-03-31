import React, {Component} from 'react';
import {
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';

import {styles, colors} from './styles';
import Star from './Star';
import ButtonBack from './ButtonBack';

const numStars = 5;

export default class ModalAddReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: '',
      animationStar: new Animated.Value(1),
    };
  }

  rating = star => {
    this.setState({rating: star});
  };

  animateStar = () => {
    Animated.timing(this.state.animationStar, {
      toValue: 2,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.state.animationStar.setValue(1);
    });
  };

  render() {
    let stars = [];

    const animateStarScale = this.state.animationStar.interpolate({
      inputRange: [1, 1.5, 2],
      outputRange: [1, 2, 1],
    });

    const animateStarStyle = {
      transform: [{scale: animateStarScale}],
    };

    for (let i = 1; i <= numStars; i++) {
      stars.push(
        <TouchableWithoutFeedback
          key={i}
          onPress={() => {
            this.rating(i), this.animateStar();
          }}>
          <Animated.View style={i <= this.state.rating ? animateStarStyle : ''}>
            <Star filled={i <= this.state.rating ? true : false} />
          </Animated.View>
        </TouchableWithoutFeedback>,
      );
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalAddReviewVisible}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: colors.blackBg,
          }}>
          <View
            style={{
              width: '95%',
              position: 'absolute',
              bottom: 10,
              padding: 20,
              borderRadius: 20,
              backgroundColor: colors.bgColor1,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 7,
            }}>
            <ButtonBack
              navigation={() => this.props.setModalAddReviewVisible(false)}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.text1,
                letterSpacing: 2,
              }}>
              How do you think{'\n'}about this movie?
            </Text>

            <View style={{flexDirection: 'row', marginVertical: 10}}>
              {stars}
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: colors.text1,
                marginBottom: 20,
                letterSpacing: 2,
              }}>
              Your Rating: {this.state.rating}
            </Text>

            <TextInput
              placeholder="Write your review here..."
              placeholderTextColor={colors.grey}
              autoCapitalize="sentences"
              onChangeText={value => this.setState({review: value})}
              multiline
              style={[
                styles.textInput,
                {
                  height: 150,
                  textAlignVertical: 'top',
                },
              ]}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.postReviews(this.state.rating, this.state.review);
                this.setState({rating: 0});
                this.props.setModalAddReviewVisible(false);
              }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: colors.bgColor2,
                borderRadius: 15,
              }}>
              <Text
                style={{fontSize: 18, fontWeight: 'bold', color: colors.text2}}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
