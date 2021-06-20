import{
    CREATE_STUDENT,
    EDIT_STUDENT
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
      case CREATE_STUDENT:
        return { ...state};
      case EDIT_STUDENT:
        return { ...state};
      default:
        return state;
    }
};
  