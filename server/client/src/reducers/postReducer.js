import{
    FETCH_POSTS,
    CREATE_POST
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
      case FETCH_POSTS:
        console.log('FETCH_POSTS reducer');
        return { ...state};
      case CREATE_POST:
        console.log('CREATE_POST reducer');
        return { ...state};
      default:
        console.log('default');
        return state;
    }
};
  