import{
    FETCH_SCHEDULE,
    CREATE_SCHEDULE,
    EDIT_SCHEDULE
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SCHEDULE:
            return { ...state, schedules: action.payload.data};
        case CREATE_SCHEDULE:
            return { ...state};
        case EDIT_SCHEDULE:
            return { ...state};
        default:
            return state;
    }
};
  