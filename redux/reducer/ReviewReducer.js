import {
  IS_LOADING,
  GET_REVIEWS_AFTER_LOGIN,
  GET_REVIEWS_BY_ID,
} from '../action/ActionTypes';

const initialState = {
  reviews: [],
  reviewById: [],
  buttonCreate: false,
  editedMark: false,
  isLoading: false,
};

export const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_LOADING:
      return {...state, isLoading: action.payload};
    case GET_REVIEWS_AFTER_LOGIN:
      let buttonCreate = action.payload.infoReviewUser[0].buttonCreate;
      let editedMark = action.payload.infoReviewUser[1].editedMark;
      return {
        reviews: action.payload.allDataReview,
        buttonCreate: buttonCreate,
        editedMark: editedMark,
      };
    case GET_REVIEWS_BY_ID:
      return {...state, reviewById: action.payload};

    default:
      return state;
  }
};
