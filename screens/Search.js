import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {getFilter} from '../redux/action/MovieAction';

import {styles, colors} from '../components/styles';
import Loading from '../components/Loading';

const WIDTH = Dimensions.get('window').width;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitle: '',
      tagName: '',
      categoryName: '',
    };
  }

  componentDidMount = () => {
    this.props.getFilter();
  };

  render() {
    const {tags, categories} = this.props.movie.filter;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bgColor1,
        }}>
        <Loading loadingVisible={this.props.movie.isLoading} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                onPress={() =>
                  this.setState({movieTitle: '', tagName: '', categoryName: ''})
                }
                style={{
                  width: 80,
                  height: 50,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.bgColor2,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: colors.text2,
                  }}>
                  Reset
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 24,
                  color: colors.text3,
                }}>
                Search Movie
              </Text>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  this.props.navigation.navigate('SearchResults', {
                    search: this.state.movieTitle,
                    tag: this.state.tagName,
                    category: this.state.categoryName,
                  })
                }
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 20,
                  backgroundColor: colors.bgColor2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  name="magnify"
                  size={30}
                  color={colors.text2}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.textTitle}>Search</Text>
            <TextInput
              placeholder="Movie title..."
              placeholderTextColor={colors.grey}
              defaultValue={this.state.movieTitle}
              onChangeText={value => this.setState({movieTitle: value})}
              style={[styles.textInput, {paddingHorizontal: 30}]}
            />
          </View>
        </TouchableWithoutFeedback>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            marginTop: -20,
            marginBottom: 5,
            paddingHorizontal: 20,
            paddingTop: 40,
            backgroundColor: colors.bgColor1,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            elevation: 9,
          }}
          contentContainerStyle={{paddingBottom: 40}}>
          <Text style={styles.textTitle}>Tags</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {tags &&
              tags.map((tag, index) => (
                <TouchableOpacity
                  onPress={() => this.setState({tagName: tag})}
                  key={index}
                  style={{
                    width: WIDTH / 2 - 40,
                    borderRadius: 10,
                    padding: 5,
                    marginVertical: 5,
                    marginHorizontal: 10,
                    borderWidth: 2,
                    borderColor:
                      this.state.tagName === tag ? colors.text2 : colors.text1,
                    backgroundColor:
                      this.state.tagName === tag
                        ? colors.bgColor2
                        : colors.bgColor1,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color:
                        this.state.tagName === tag
                          ? colors.text2
                          : colors.text1,
                    }}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>

          <View style={{marginVertical: 30}}>
            <Text style={styles.textTitle}>Categories</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {categories &&
                categories.map((category, index) => (
                  <TouchableOpacity
                    onPress={() => this.setState({categoryName: category})}
                    key={index}
                    style={{
                      width: WIDTH / 2 - 40,
                      borderRadius: 10,
                      padding: 5,
                      marginVertical: 5,
                      marginHorizontal: 10,
                      borderWidth: 2,
                      borderColor:
                        this.state.categoryName === category
                          ? colors.text2
                          : colors.text1,
                      backgroundColor:
                        this.state.categoryName === category
                          ? colors.bgColor2
                          : colors.bgColor1,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color:
                          this.state.categoryName === category
                            ? colors.text2
                            : colors.text1,
                      }}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
});

export default connect(mapStateToProps, {getFilter})(Search);
