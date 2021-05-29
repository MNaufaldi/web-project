import {
  FETCH_USER
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: ''
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...INITIAL_STATE, user: action.payload || false };
    default:
      return state;
  }
}