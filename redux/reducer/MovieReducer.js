import {
  IS_LOADING,
  GET_ALL_MOVIES,
  GET_MOVIE_BY_ID,
  GET_MAKER_BY_ID,
  GET_FILTER,
  GET_MOVIE_RESULTS,
} from '../action/ActionTypes';

const initialState = {
  movies: [],
  movieById: [],
  makerById: [],
  filter: [],
  movieResults: [],
  isLoading: false,
};

export const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {...state, isLoading: action.payload};
    case GET_ALL_MOVIES:
      return {...state, movies: action.payload};
    case GET_MOVIE_BY_ID:
      return {...state, movieById: action.payload};
    case GET_MAKER_BY_ID:
      return {...state, makerById: action.payload};
    case GET_FILTER:
      return {...state, filter: action.payload};
    case GET_MOVIE_RESULTS:
      return {...state, movieResults: action.payload};
    default:
      return state;
  }
};
