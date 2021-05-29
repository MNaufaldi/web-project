import user from '../apis/students';
import { FETCH_USER,
  FETCH_POSTS,
  FETCH_STUDENT_SCORES,
  FETCH_TEACHER_SCORES,
  FETCH_CLASSROOM,
  FETCH_SCHEDULE,
  CREATE_POST,
  CREATE_SCORES,
  CREATE_STUDENT,
  CREATE_TEACHER,
  CREATE_CLASSROOM,
  CREATE_SCHEDULE,
  EDIT_STUDENT,
  EDIT_TEACHER,
  EDIT_CLASSROOM,
  EDIT_SCORES,
  EDIT_SCHEDULE,
  LOGIN,
  LOGOUT } from './types';

export const fetchUser = (id) => async dispatch => {
  // Get user with id from API
  const response = await user.get(`/`);
  console.log('FETCH_USER action');
  dispatch({ type: FETCH_USER, payload: response })
}

export const fetchStudentScores = (id) => async dispatch => {
  // Get student score with id from API
  const response = await user.get(`/`);
  console.log('FETCH_STUDENT_SCORES action');
  dispatch({ type: FETCH_STUDENT_SCORES, payload: response })
}

export const fetchTeacherScores = (id, classId) => async dispatch => {
  // Get students score in a classroom with classId from API
  const response = await user.get(`/`);
  console.log('TEACHER_SCORES action');
  dispatch({ type: FETCH_TEACHER_SCORES, payload: response })
}

export const fetchClassroom = (classId) => async dispatch => {
  // Get classroom with id from API
  const response = await user.get(`/`);
  console.log('FETCH_CLASSROOM action');
  dispatch({ type: FETCH_CLASSROOM, payload: response })
}

// export const fetchPosts = (yearId) => async dispatch => {
//   // Get posts with yearId which will be a part of the post id, something like
//   // [yearId classId index?] NOT FINAL
//   const response = await user.get(`/`);
//   console.log('FETCH_POSTS action');
//   dispatch({ type: FETCH_POSTS, payload: response })
// }

export const fetchPosts = (yearId) => dispatch => {

  console.log('FETCH_POSTS action');
  dispatch({ type: FETCH_POSTS, payload: yearId })
}

export const fetchSchedule = (classId) => async dispatch => {
  // Get schedule with classId
  const response = await user.get(`/`);
  console.log('FETCH_SCHEDULE action');
  dispatch({ type: FETCH_SCHEDULE, payload: response })
}

export const createPost = (formValues) => async dispatch => {
  // Create a post from a form
  const response = await user.get(`/`);
  console.log('CREATE_POST action');
  dispatch({ type: CREATE_POST, payload: response })
}

export const createScores = (formValues) => async dispatch => {
  // Create a list of scores with the data from a form
  const response = await user.get(`/`);
  console.log('CREATE_SCORES action');
  dispatch({ type: CREATE_SCORES, payload: response })
}

export const createStudent = (formValues) => async dispatch => {
  // Create a student with the data from a form
  const response = await user.get(`/`);
  console.log('CREATE_STUDENT action');
  dispatch({ type: CREATE_STUDENT, payload: response })
}

export const createTeacher = (formValues) => async dispatch => {
  // Create a teacher with the data from a form
  const response = await user.get(`/`);
  console.log('CREATE_TEACHER action');
  dispatch({ type: CREATE_TEACHER, payload: response })
}

export const createClassroom = (formValues) => async dispatch => {
  // Create a classroom with the data from a form
  const response = await user.get(`/`);
  console.log('CREATE_CLASSROOM action');
  dispatch({ type: CREATE_CLASSROOM, payload: response })
}

export const createSchedule = (formValues) => async dispatch => {
  // Create a schedule for a classroom with the data from a form
  const response = await user.get(`/`);
  console.log('CREATE_SCHEDULE action');
  dispatch({ type: CREATE_SCHEDULE, payload: response })
}

export const editScores = (formValues) => async dispatch => {
  // Edit a list of scores with the data from a form
  const response = await user.get(`/`);
  console.log('EDIT_SCORES action');
  dispatch({ type: EDIT_SCORES, payload: response })
}

export const editStudent = (formValues) => async dispatch => {
  // Edit a student with the data from a form
  const response = await user.get(`/`);
  console.log('EDIT_STUDENT action');
  dispatch({ type: EDIT_STUDENT, payload: response })
}

export const editTeacher = (formValues) => async dispatch => {
  // Edit a teacher with the data from a form
  const response = await user.get(`/`);
  console.log('EDIT_TEACHER action');
  dispatch({ type: EDIT_TEACHER, payload: response })
}

export const editClassroom = (formValues) => async dispatch => {
  // Edit a classroom with the data from a form
  const response = await user.get(`/`);
  console.log('EDIT_CLASSROOM action');
  dispatch({ type: EDIT_CLASSROOM, payload: response })
}

export const editSchedule = (formValues) => async dispatch => {
  // Edit a list of schedule with the data from a form
  const response = await user.get(`/`);
  console.log('EDIT_SCHEDULE action');
  dispatch({ type: EDIT_SCHEDULE, payload: response })
}

export const login = (formValues) => async dispatch => {
  // Login
  const response = await user.get(`/`);
  console.log('LOGIN action');
  dispatch({ type: LOGIN, payload: response })
}


export const logout = (formValues) => async dispatch => {
  // LOGOUT
  const response = await user.get(`/`);
  console.log('LOGOUT action');
  dispatch({ type: LOGOUT, payload: response })
}

