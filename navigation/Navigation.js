import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider} from 'react-redux';
import {store} from '../redux/store';

import {colors} from '../components/styles';

import LandingPage from '../screens/LandingPage';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import AuthLoading from '../screens/AuthLoading';

import Home from '../screens/Home';
import MovieDetails from '../screens/MovieDetails';
import MakerDetails from '../screens/MakerDetails';
import Review from '../screens/Review';
import ModalEditReview from '../components/ModalEditReview';
import Search from '../screens/Search';
import SearchResults from '../screens/SearchResults';

import Profile from '../screens/Profile';

const AuthStack = createStackNavigator(
  {
    LandingPage: {
      screen: LandingPage,
    },
    SignIn: {
      screen: SignIn,
    },
    SignUp: {
      screen: SignUp,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      animationTypeForReplace: 'pop',
      cardStyleInterpolator: ({current, closing}) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    },
  },
);

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    MovieDetails: {
      screen: MovieDetails,
    },
    MakerDetails: {
      screen: MakerDetails,
    },
    Review: {
      screen: Review,
    },
    ModalEditReview: {
      screen: ModalEditReview,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      cardStyleInterpolator: ({current, closing}) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    },
  },
);

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: Search,
    },
    SearchResults: {
      screen: SearchResults,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      cardStyleInterpolator: ({current, closing}) => ({
        cardStyle: {
          opacity: current.progress,
        },
      }),
    },
  },
);

const AppNav = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Search: {
      screen: SearchStack,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    shifting: true,
    activeColor: colors.text2,
    inactiveColor: colors.text2,
    barStyle: {backgroundColor: colors.bgColor2},
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (routeName === 'Search') {
          iconName = 'magnify';
        } else if (routeName === 'Profile') {
          iconName = focused ? 'account' : 'account-outline';
        }
        return (
          <MaterialCommunityIcons name={iconName} size={24} color={tintColor} />
        );
      },
    }),
  },
);

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppNav,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
