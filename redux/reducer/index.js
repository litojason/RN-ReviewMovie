import {combineReducers} from 'redux';
import {MovieReducer} from './MovieReducer';
import {ReviewReducer} from './ReviewReducer';

export default combineReducers({
  movie: MovieReducer,
  review: ReviewReducer,
});
