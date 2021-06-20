import {
  LOGIN,
  FETCH_USER,
  FETCH_ROLE,
  VERIFY_TOKEN
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: false,
  userId: null
}

export default (state = INITIAL_STATE, action) => {
  // console.log(state);
  switch (action.type) {
    case LOGIN:
      return { ...INITIAL_STATE, isSignedIn: true, userId: action.payload};
    case FETCH_USER:
      return {...state, user: action.payload.user, user_details: action.payload.details, userId: action.payload.user._id};
    case FETCH_ROLE:
      return {...state, role: action.payload.data}
    case VERIFY_TOKEN:
      return {...state, status: action.payload}
    default:
      return state;
  }
}