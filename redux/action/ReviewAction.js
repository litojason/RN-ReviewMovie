import axios from 'axios';
import {
  IS_LOADING,
  GET_REVIEWS_AFTER_LOGIN,
  GET_REVIEWS_BY_ID,
} from './ActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

export const postReviews = (rating, review, movieId) => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios({
        method: 'post',
        url: `https://reviewmoviedatabase.herokuapp.com/api/v1/reviews`,
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
        data: {
          rating: rating,
          review: review,
          movieId: movieId,
        },
      });

      if (res) {
        dispatch(getReviewsAfterLogin(movieId));
      }
    } catch (e) {
      console.log('post review error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const putReviews = (rating, review, reviewId, movieId) => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios({
        method: 'put',
        url: `https://reviewmoviedatabase.herokuapp.com/api/v1/reviews`,
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
        data: {
          rating: rating,
          review: review,
          id: reviewId,
        },
      });

      if (res) {
        dispatch(getReviewsAfterLogin(movieId));
      }
    } catch (e) {
      console.log('put review error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const deleteReviews = (reviewId, movieId) => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios({
        method: 'delete',
        url: `https://reviewmoviedatabase.herokuapp.com/api/v1/reviews`,
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
        data: {
          id: reviewId,
        },
      });

      if (res) {
        dispatch(getReviewsAfterLogin(movieId));
      }
    } catch (e) {
      console.log('delete review error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

// export const getReviewsBeforeLogin = movieId => {
//   return async dispatch => {
//     try {
//       dispatch({type: IS_LOADING, payload: true});
//       const res = await axios({
//         method: 'get',
//         url: `https://reviewmoviedatabase.herokuapp.com/api/v1/reviews/beforelogin?movieId=${movieId}`,
//         headers: {
//           Authorization: await AsyncStorage.getItem('token'),
//         },
//       });

//       if (res) {
//         console.log(res.data);
//         dispatch({type: GET_REVIEWS_BEFORE_LOGIN, payload: res.data.data.docs});
//       }
//     } catch (e) {
//       console.log('get review before login error', e);
//     }
//   };
// };

export const getReviewsAfterLogin = movieId => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios({
        method: 'get',
        url: `https://reviewmoviedatabase.herokuapp.com/api/v1/reviews/afterlogin?movieId=${movieId}`,
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
      });

      if (res) {
        dispatch({type: GET_REVIEWS_AFTER_LOGIN, payload: res.data.data});
        dispatch({type: IS_LOADING, payload: false});
      }
    } catch (e) {
      console.log('get review after login error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const getReviewsById = reviewId => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios({
        method: 'get',
        url: `https://reviewmoviedatabase.herokuapp.com/api/v1/reviews/id?id=${reviewId}`,
        headers: {
          Authorization: await AsyncStorage.getItem('token'),
        },
      });

      if (res) {
        dispatch({type: GET_REVIEWS_BY_ID, payload: res.data.data});
        dispatch({type: IS_LOADING, payload: false});
      }
    } catch (e) {
      console.log('get review by id error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};
