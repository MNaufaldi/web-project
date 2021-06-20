import{
    FETCH_CLASSROOM,
    CREATE_CLASSROOM,
    FETCH_CLASSROOM_NAME,
    FETCH_SUBJECT,
    EDIT_CLASSROOM
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_CLASSROOM:
            return { ...state};
        case FETCH_CLASSROOM:
            return { ...state, payload: action.payload};
        case FETCH_CLASSROOM_NAME:
            return { ...state, name: action.payload};
        case EDIT_CLASSROOM:
            return { ...state};
        case FETCH_SUBJECT:
            return { ...state, subjectName: action.payload};
        default:
            return state;
    }
};
  