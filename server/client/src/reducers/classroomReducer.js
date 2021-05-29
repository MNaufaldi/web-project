import{
    FETCH_CLASSROOM,
    CREATE_CLASSROOM,
    EDIT_CLASSROOM
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_CLASSROOM:
            console.log('CREATE_CLASSROOM reducer');
            return { ...state};
        case FETCH_CLASSROOM:
            console.log('FETCH_CLASSROOM reducer');
            return { ...state};
        case EDIT_CLASSROOM:
            console.log('EDIT_CLASSROOM reducer');
            return { ...state};
        default:
            console.log('default');
            return state;
    }
};
  