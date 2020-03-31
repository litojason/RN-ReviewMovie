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
import {connect} from 'react-redux';
import {getReviewsById, putReviews} from '../redux/action/ReviewAction';

import {styles, colors} from './styles';
import Loading from './Loading';
import Star from './Star';
import ButtonBack from './ButtonBack';

const numStars = 5;

class ModalEditReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      review: '',
      animationStar: new Animated.Value(1),
    };
  }

  componentDidMount = () => {
    this.props.getReviewsById(this.props.navigation.getParam('reviewId'));
  };

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

    if (this.props.review.reviewById === undefined) {
      return <Loading loadingVisible={this.props.review.isLoading} />;
    }
    const {rating, review, _id, movieId} = this.props.review.reviewById;
    return (
      <Modal animationType="fade" transparent={true} visible={true}>
        <Loading loadingVisible={this.props.review.isLoading} />
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
            <ButtonBack navigation={() => this.props.navigation.goBack()} />
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
              Your Rating:{' '}
              {this.state.rating === 0
                ? this.setState({rating: rating})
                : this.state.rating}
            </Text>

            <TextInput
              placeholder="Edit review here..."
              placeholderTextColor={colors.grey}
              autoCapitalize="sentences"
              defaultValue={review}
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
                console.log('before', this.state.review);
                if (
                  this.state.review === '' ||
                  this.state.review === undefined
                ) {
                  this.setState({review: this.props.review.reviewById.review});
                }
                console.log('after', this.state.review);
                this.props.putReviews(
                  this.state.rating,
                  this.state.review,
                  _id,
                  movieId,
                );
                this.props.navigation.goBack();
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

const mapStateToProps = state => ({
  review: state.review,
});

export default connect(mapStateToProps, {getReviewsById, putReviews})(
  ModalEditReview,
);
