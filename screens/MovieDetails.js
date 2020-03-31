import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {getMovieById} from '../redux/action/MovieAction';

import {styles, colors} from '../components/styles';
import Loading from '../components/Loading';
import ButtonBack from '../components/ButtonBack';
import MakerCard from '../components/MakerCard';
import ModalWatch from '../components/ModalWatch';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWatchVisible: false,
    };
  }

  componentDidMount = () => {
    this.props.getMovieById(this.props.navigation.getParam('movieId'));
  };

  setModalWatchVisible = visible => {
    this.setState({modalWatchVisible: visible});
  };

  render() {
    const {
      trailer,
      poster,
      rating,
      categories,
      title,
      tags,
      releaseDate,
      budget,
      synopsis,
      cast,
      director,
      producer,
      writer,
    } = this.props.movie.movieById;
    return (
      <View style={{flex: 1, backgroundColor: colors.bgColor1}}>
        <Loading loadingVisible={this.props.movie.isLoading} />
        <ModalWatch
          modalWatchVisible={this.state.modalWatchVisible}
          setModalWatchVisible={this.setModalWatchVisible}
          trailer={trailer}
        />

        <Image
          source={{uri: poster}}
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
            flexDirection: 'row',
            position: 'absolute',
            top: 12,
            right: 12,
            width: 60,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.bgColor2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text2}}>
            {rating}
          </Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text2}}>
            /5
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => this.setModalWatchVisible(true)}
          style={{
            position: 'absolute',
            bottom: HEIGHT * 0.6 - 30,
            right: WIDTH / 10,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.bgColor2,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
          }}>
          <MaterialCommunityIcons name="play" size={40} color={colors.text2} />
        </TouchableOpacity>

        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: HEIGHT * 0.6,
            backgroundColor: colors.bgColor1,
            paddingTop: 30,
            paddingHorizontal: 20,
            borderRadius: 50,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              {categories &&
                categories.map((category, index) => (
                  <View
                    key={index}
                    style={{
                      paddingVertical: 2,
                      paddingHorizontal: 5,
                      borderRadius: 10,
                      backgroundColor: colors.bgColor2,
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: colors.text2,
                      }}>
                      {category}
                    </Text>
                  </View>
                ))}
            </View>

            <ScrollView horizontal>
              <Text style={{fontSize: 30, color: colors.text3}}>{title}</Text>
            </ScrollView>

            <View style={{flexDirection: 'row'}}>
              {tags &&
                tags.map((tag, index) => (
                  <Text
                    key={index}
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: colors.text1,
                      marginRight: 5,
                    }}>
                    {tag}
                  </Text>
                ))}
            </View>

            <Text style={{fontSize: 16, letterSpacing: 1, color: colors.text3}}>
              Release Date: <Text>{releaseDate}</Text>
            </Text>
            <Text style={{fontSize: 16, letterSpacing: 1, color: colors.text3}}>
              Budget: <Text>{budget}</Text>
            </Text>

            <View style={{marginTop: 20}}>
              <Text style={styles.textTitle}>Synopsis</Text>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.text3,
                  textAlign: 'justify',
                  letterSpacing: 1,
                }}>
                {synopsis}
              </Text>
            </View>

            <View style={{}}>
              <Text style={styles.textTitle}>Cast</Text>
              <ScrollView horizontal>
                {cast && cast.length != 0 ? (
                  cast.map(person => (
                    <MakerCard
                      navigation={() =>
                        this.props.navigation.navigate('MakerDetails', {
                          makerId: person.makerId,
                        })
                      }
                      key={person.makerId}
                      photo={person.photo}
                      name={person.name}
                    />
                  ))
                ) : (
                  <Text style={{fontSize: 18, color: colors.text3}}>
                    No info yet
                  </Text>
                )}
              </ScrollView>
            </View>

            <View style={{marginVertical: 20}}>
              <Text style={styles.textTitle}>Director</Text>
              <ScrollView horizontal>
                {director && director.length != 0 ? (
                  director.map(person => (
                    <MakerCard
                      navigation={() =>
                        this.props.navigation.navigate('MakerDetails', {
                          makerId: person.makerId,
                        })
                      }
                      key={person.makerId}
                      photo={person.photo}
                      name={person.name}
                    />
                  ))
                ) : (
                  <Text style={{fontSize: 18, color: colors.text3}}>
                    No info yet
                  </Text>
                )}
              </ScrollView>
            </View>

            <View style={{}}>
              <Text style={styles.textTitle}>Producer</Text>
              <ScrollView horizontal>
                {producer && producer.length != 0 ? (
                  producer.map(person => (
                    <MakerCard
                      navigation={() =>
                        this.props.navigation.navigate('MakerDetails', {
                          makerId: person.makerId,
                        })
                      }
                      key={person.makerId}
                      photo={person.photo}
                      name={person.name}
                    />
                  ))
                ) : (
                  <Text style={{fontSize: 18, color: colors.text3}}>
                    No info yet
                  </Text>
                )}
              </ScrollView>
            </View>

            <View style={{marginVertical: 20}}>
              <Text style={styles.textTitle}>Writer</Text>
              <ScrollView horizontal>
                {writer && writer.length != 0 ? (
                  writer.map(person => (
                    <MakerCard
                      navigation={() =>
                        this.props.navigation.navigate('MakerDetails', {
                          makerId: person.makerId,
                        })
                      }
                      key={person.makerId}
                      photo={person.photo}
                      name={person.name}
                    />
                  ))
                ) : (
                  <Text style={{fontSize: 18, color: colors.text3}}>
                    No info yet
                  </Text>
                )}
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Review', {
                  movieId: this.props.navigation.getParam('movieId'),
                })
              }
              style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Show Reviews</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
});

export default connect(mapStateToProps, {getMovieById})(MovieDetails);
