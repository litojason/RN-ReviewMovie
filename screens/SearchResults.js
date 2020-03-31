import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {getMovieResults} from '../redux/action/MovieAction';

import {styles, colors} from '../components/styles';

const WIDTH = Dimensions.get('window').width;

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount = () => {
    this.getMovieResults();
  };

  getMovieResults = () => {
    this.props.getMovieResults(
      this.props.navigation.getParam('search'),
      this.props.navigation.getParam('tag'),
      this.props.navigation.getParam('category'),
      this.state.page,
    );
  };

  handlePrevPage = () => {
    this.setState({page: (this.state.page -= 1)});
    this.getMovieResults();
  };

  handleNextPage = () => {
    this.setState({page: (this.state.page += 1)});
    this.getMovieResults();
  };

  sliceTitle = title => {
    if (title.length > 14) {
      return title.slice(0, 14) + '...';
    } else {
      return title;
    }
  };

  render() {
    const {docs, hasPrevPage, hasNextPage} = this.props.movie.movieResults;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgColor1,
        }}>
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
              Results
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {hasPrevPage && (
                <TouchableOpacity
                  onPress={() => this.handlePrevPage()}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    backgroundColor: colors.bgColor2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="chevron-double-left"
                    size={24}
                    color={colors.text2}
                  />
                </TouchableOpacity>
              )}

              <Text
                style={{
                  marginHorizontal: 5,
                  fontSize: 18,
                  color: colors.text3,
                }}>
                page {this.state.page}
              </Text>

              {hasNextPage ? (
                <TouchableOpacity
                  onPress={() => this.handleNextPage()}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 10,
                    backgroundColor: colors.bgColor2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="chevron-double-right"
                    size={24}
                    color={colors.text2}
                  />
                </TouchableOpacity>
              ) : (
                <View style={{width: 30, height: 30}} />
              )}
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textTitle}>Title:</Text>
            <Text
              style={[styles.textTitle, {marginLeft: 5, fontWeight: 'normal'}]}>
              {this.props.navigation.getParam('search')}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textTitle, {flex: 1}]}>Tag:</Text>
            <Text style={[styles.textTitle, {flex: 1}]}>Category:</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textTitle, {flex: 1, color: colors.text1}]}>
              {this.props.navigation.getParam('tag')}
            </Text>
            <Text style={[styles.textTitle, {flex: 1, color: colors.text1}]}>
              {this.props.navigation.getParam('category')}
            </Text>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={docs}
          numColumns={2}
          style={{marginTop: -20}}
          contentContainerStyle={{paddingHorizontal: 10, paddingTop: 40}}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('MovieDetails', {
                  movieId: item._id,
                })
              }
              activeOpacity={0.8}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                marginHorizontal: 10,
                marginBottom: 20,
                borderRadius: 10,
                backgroundColor: colors.bgColor1,
                elevation: 5,
              }}>
              <View
                style={{
                  zIndex: 2,
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.bgColor2,
                }}>
                <Text style={{fontSize: 18, color: colors.text2}}>
                  {item.rating}
                </Text>
              </View>
              <Image
                source={{uri: item.poster}}
                style={{
                  zIndex: 1,
                  width: WIDTH / 2 - 50,
                  height: WIDTH / 2,
                  borderRadius: 5,
                  resizeMode: 'cover',
                }}
              />
              <Text style={{marginTop: 10, fontSize: 16, color: colors.text3}}>
                {this.sliceTitle(item.title)}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
});

export default connect(mapStateToProps, {getMovieResults})(SearchResults);
