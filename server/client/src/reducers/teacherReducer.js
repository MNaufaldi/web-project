import{
    FETCH_TEACHER_SCORES,
    CREATE_TEACHER,
    EDIT_TEACHER
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
      case FETCH_TEACHER_SCORES:
        console.log('FETCH_TEACHER_SCORES reducer');
        return { ...state};
      case CREATE_TEACHER:
        console.log('CREATE_TEACHER reducer');
        return { ...state};
      case EDIT_TEACHER:
        console.log('EDIT_TEACHER reducer');
        return { ...state};
      default:
        console.log('default');
        return state;
    }
};
  