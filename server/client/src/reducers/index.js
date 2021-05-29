import { combineReducers } from 'redux';
import authReducer from './authReducer';
import studentReducer from './studentReducer'
import { reducer as formReducer } from 'redux-form';
import teacherReducer from './teacherReducer';
import postReducer from './postReducer';
import classroomReducer from './classroomReducer';
import scheduleReducer from './scheduleReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  student: studentReducer,
  teacher: teacherReducer,
  post: postReducer,
  classroom: classroomReducer,
  schedule: scheduleReducer
});
