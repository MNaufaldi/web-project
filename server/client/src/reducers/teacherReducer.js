import{
    CREATE_TEACHER,
    EDIT_TEACHER
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
      case CREATE_TEACHER:
        return { ...state};
      case EDIT_TEACHER:
        return { ...state};
      default:
        return state;
    }
};
  