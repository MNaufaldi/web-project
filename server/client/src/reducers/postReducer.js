import{
    FETCH_POSTS,
    CREATE_POST
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
      case FETCH_POSTS:
        return {...state, posts: action.payload.data};
      case CREATE_POST:
        return { ...state};
      default:
        return state;
    }
};
  