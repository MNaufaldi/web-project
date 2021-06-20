import { combineReducers } from 'redux';
import authReducer from './authReducer';
import studentReducer from './studentReducer'
import { reducer as formReducer } from 'redux-form';
import teacherReducer from './teacherReducer';
import postReducer from './postReducer';
import classroomReducer from './classroomReducer';
import scheduleReducer from './scheduleReducer';
import { LOGOUT } from '../actions/types';

const allReducers =  combineReducers({
  auth: authReducer,
  form: formReducer,
  student: studentReducer,
  teacher: teacherReducer,
  post: postReducer,
  classroom: classroomReducer,
  schedule: scheduleReducer
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT:
      return state= undefined;
    default:
      return allReducers(state, action);
  }
}

export default rootReducer;