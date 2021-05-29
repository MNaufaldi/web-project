import{
    FETCH_STUDENT_SCORES,
    CREATE_STUDENT,
    EDIT_STUDENT
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
      case FETCH_STUDENT_SCORES:
        console.log('FETCH_STUDENT_SCORES reducer');
        return { ...state};
      case CREATE_STUDENT:
        console.log('CREATE_STUDENT reducer');
        return { ...state};
      case EDIT_STUDENT:
        console.log('EDIT_STUDENT reducer');
        return { ...state};
      default:
        console.log('default');
        return state;
    }
};
  