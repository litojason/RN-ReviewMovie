import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {getMakerById} from '../redux/action/MovieAction';

import {styles, colors} from '../components/styles';
import Loading from '../components/Loading';
import ButtonBack from '../components/ButtonBack';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MakerDetails extends Component {
  componentDidMount = () => {
    this.props.getMakerById(this.props.navigation.getParam('makerId'));
  };

  render() {
    const {photo, name, description, movie} = this.props.movie.makerById;
    return (
      <View style={{flex: 1, backgroundColor: colors.bgColor1}}>
        <Loading loadingVisible={this.props.movie.isLoading} />
        <Image
          source={{uri: photo}}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            resizeMode: 'cover',
            height: HEIGHT / 2,
          }}
        />

        <ButtonBack navigation={() => this.props.navigation.goBack()} />

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: HEIGHT * 0.6,
            backgroundColor: colors.bgColor1,
            paddingTop: 20,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}>
          <View
            style={{
              width: '100%',
              paddingBottom: 10,
              borderBottomWidth: 2,
              borderBottomColor: colors.grey,
            }}>
            <Text style={{fontSize: 30, color: colors.text3}}>{name}</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: colors.text3,
                textAlign: 'justify',
                letterSpacing: 1,
              }}>
              {description}
            </Text>

            <Text style={styles.textTitle}>Filmography</Text>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
              {movie &&
                movie.map((film, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      this.props.navigation.navigate('MovieDetails', {
                        movieId: film.movieId._id,
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
                    <Image
                      source={{uri: film.movieId.poster}}
                      style={{
                        zIndex: 1,
                        width: WIDTH / 2 - 60,
                        height: WIDTH / 2,
                        borderRadius: 5,
                        resizeMode: 'cover',
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colors.text3,
                      }}>
                      {film.movieId.title}
                    </Text>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 16,
                        color: colors.text3,
                      }}>
                      {film.movieId.releaseDate}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
});

export default connect(mapStateToProps, {getMakerById})(MakerDetails);
