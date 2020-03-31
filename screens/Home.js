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
import {getMovies} from '../redux/action/MovieAction';

import {colors} from '../components/styles';
import Icon from '../components/Icon';
import Loading from '../components/Loading';

const WIDTH = Dimensions.get('window').width;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount = () => {
    this.props.getMovies(this.state.page);
  };

  handlePrevPage = () => {
    this.setState({page: (this.state.page -= 1)});
    this.props.getMovies(this.state.page);
  };

  handleNextPage = () => {
    this.setState({page: (this.state.page += 1)});
    this.props.getMovies(this.state.page);
  };

  sliceTitle = title => {
    if (title.length > 14) {
      return title.slice(0, 14) + '...';
    } else {
      return title;
    }
  };

  render() {
    const {docs, hasPrevPage, hasNextPage} = this.props.movie.movies;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgColor1,
          paddingHorizontal: 10,
          paddingTop: 60,
        }}>
        <Loading loadingVisible={this.props.movie.isLoading} />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            flexDirection: 'row',
            backgroundColor: colors.bgColor1,
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 7,
          }}>
          <Icon />
          <View
            style={{
              flexDirection: 'row',
              marginRight: 10,
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
              style={{marginHorizontal: 5, fontSize: 18, color: colors.text3}}>
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

        <FlatList
          showsVerticalScrollIndicator={false}
          data={docs}
          numColumns={2}
          contentContainerStyle={{paddingTop: 20}}
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

export default connect(mapStateToProps, {getMovies})(Home);
