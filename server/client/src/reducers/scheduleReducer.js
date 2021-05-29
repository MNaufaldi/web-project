import{
    FETCH_SCHEDULE,
    CREATE_SCHEDULE,
    EDIT_SCHEDULE
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SCHEDULE:
            console.log('FETCH_SCHEDULE reducer');
            return { ...state};
        case CREATE_SCHEDULE:
            console.log('CREATE_SCHEDULE reducer');
            return { ...state};
        case EDIT_SCHEDULE:
            console.log('EDIT_SCHEDULE reducer');
            return { ...state};
        default:
            console.log('default');
            return state;
    }
};
  