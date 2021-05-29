import{
    CREATE_SCORES,
    EDIT_SCORES
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
      case CREATE_SCORES:
        console.log('CREATE_SCORES reducer');
        return { ...state};
      case EDIT_SCORES:
        console.log('EDIT_SCORES reducer');
        return { ...state};
      default:
        console.log('default');
        return state;
    }
};
  