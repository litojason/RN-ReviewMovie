import axios from 'axios';
import {
  IS_LOADING,
  GET_ALL_MOVIES,
  GET_MOVIE_BY_ID,
  GET_MAKER_BY_ID,
  GET_FILTER,
  GET_MOVIE_RESULTS,
} from './ActionTypes';

export const getMovies = page => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios.get(
        `https://reviewmoviedatabase.herokuapp.com/api/v1/movies/searchall?limit=10&page=${page}`,
      );
      if (res) {
        dispatch({type: GET_ALL_MOVIES, payload: res.data.data});
        dispatch({type: IS_LOADING, payload: false});
      }
    } catch (e) {
      console.log('get movies error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const getMovieById = id => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios.get(
        `https://reviewmoviedatabase.herokuapp.com/api/v1/movies/id?id=${id}`,
      );
      if (res) {
        dispatch({type: GET_MOVIE_BY_ID, payload: res.data.data});
        dispatch({type: IS_LOADING, payload: false});
      }
    } catch (e) {
      console.log('get movie by id error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const getMakerById = id => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios.get(
        `https://reviewmoviedatabase.herokuapp.com/api/v1/makers?id=${id}`,
      );
      if (res) {
        dispatch({type: GET_MAKER_BY_ID, payload: res.data.data});
        dispatch({type: IS_LOADING, payload: false});
      }
    } catch (e) {
      console.log('get movie by id error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const getFilter = () => {
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios.get(
        `https://reviewmoviedatabase.herokuapp.com/api/v1/movies/showfilter`,
      );
      if (res) {
        dispatch({type: GET_FILTER, payload: res.data.data});
        dispatch({type: IS_LOADING, payload: false});
      }
    } catch (e) {
      console.log('get filter', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};

export const getMovieResults = (search, tag, category, page) => {
  let query = '';
  if (search) {
    query += '&search=' + search;
  }
  if (tag) {
    query += '&tag=' + tag.replace('#', '');
  }
  if (category) {
    query += '&category=' + category;
  }
  return async dispatch => {
    try {
      dispatch({type: IS_LOADING, payload: true});
      const res = await axios.get(
        `https://reviewmoviedatabase.herokuapp.com/api/v1/movies/searchall?limit=10&page=${page}${query}`,
      );
      if (res) {
        dispatch({type: GET_MOVIE_RESULTS, payload: res.data.data});
        dispatch({type: IS_LOADING, payload: false});
      }
    } catch (e) {
      console.log('get movie results error', e);
      dispatch({type: IS_LOADING, payload: false});
    }
  };
};
