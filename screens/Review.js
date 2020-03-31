import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  getReviewsAfterLogin,
  postReviews,
  deleteReviews,
} from '../redux/action/ReviewAction';

import {colors} from '../components/styles';
import Loading from '../components/Loading';
import ModalAddReview from '../components/ModalAddReview';
import ModalDeleteReview from '../components/ModalDeleteReview';

const WIDTH = Dimensions.get('window').width;

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddReviewVisible: false,
      modalDeleteReviewVisible: false,
    };
  }

  componentDidMount = () => {
    this.props.getReviewsAfterLogin(this.props.navigation.getParam('movieId'));
  };

  setModalAddReviewVisible = visible => {
    this.setState({modalAddReviewVisible: visible});
  };

  setModalDeleteReviewVisible = visible => {
    this.setState({modalDeleteReviewVisible: visible});
  };

  render() {
    const {reviews, buttonCreate} = this.props.review;

    return (
      <View style={{flex: 1, backgroundColor: colors.bgColor1}}>
        <Loading loadingVisible={this.props.review.isLoading} />
        <ModalAddReview
          modalAddReviewVisible={this.state.modalAddReviewVisible}
          setModalAddReviewVisible={this.setModalAddReviewVisible}
          postReviews={(rating, review) =>
            this.props.postReviews(
              rating,
              review,
              this.props.navigation.getParam('movieId'),
            )
          }
        />
        <ModalDeleteReview
          modalDeleteReviewVisible={this.state.modalDeleteReviewVisible}
          setModalDeleteReviewVisible={this.setModalDeleteReviewVisible}
          deleteReviews={() =>
            this.props.deleteReviews(reviews[0]._id, reviews[0].movieId)
          }
        />

        <View
          style={{
            padding: 20,
            backgroundColor: colors.bgColor1,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.goBack()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.bgColor2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                size={30}
                color={colors.text2}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                color: colors.text3,
              }}>
              Reviews
            </Text>
            <View style={{width: 40, height: 40}} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ModalEditReview', {
                  reviewId: reviews[0]._id,
                });
              }}
              activeOpacity={0.7}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: colors.bgColor2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={40}
                color={colors.text2}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setModalDeleteReviewVisible(true)}
              activeOpacity={0.7}
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: colors.bgColor2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name="delete"
                size={40}
                color={colors.text2}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.setModalAddReviewVisible(true)}
          activeOpacity={0.7}
          style={{
            width: WIDTH - 20,
            padding: 30,
            marginVertical: 10,
            borderRadius: 20,
            backgroundColor: colors.bgColor1,
            alignSelf: 'center',
            alignItems: 'center',
            elevation: 15,
          }}>
          <View
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: colors.bgColor2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialCommunityIcons
              name="comment-plus-outline"
              size={40}
              color={colors.text2}
            />
          </View>
        </TouchableOpacity>

        <FlatList
          data={reviews}
          contentContainerStyle={{padding: 10}}
          renderItem={({item}) => (
            <View
              style={{
                width: '100%',
                padding: 20,
                marginBottom: 20,
                borderRadius: 20,
                backgroundColor: colors.bgColor1,
                elevation: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Image
                  source={{uri: item.userId.image}}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    resizeMode: 'cover',
                  }}
                />
                <View style={{marginLeft: 20, justifyContent: 'center'}}>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: colors.text1,
                      letterSpacing: 1,
                    }}>
                    {item.userId.name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="star"
                      size={30}
                      color={colors.yellow}
                    />
                    <Text style={{fontSize: 24, color: colors.text3}}>
                      <Text style={{fontWeight: 'bold'}}>{item.rating}</Text>/5
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{fontSize: 20, color: colors.text3, letterSpacing: 1}}>
                {item.review}
              </Text>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  review: state.review,
});

export default connect(mapStateToProps, {
  getReviewsAfterLogin,
  postReviews,
  deleteReviews,
})(Review);
