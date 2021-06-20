
import user from '../apis/students';
import { FETCH_USER,
  FETCH_POSTS,
  FETCH_CLASSROOM,
  FETCH_SCHEDULE,
  FETCH_ROLE,
  CREATE_POST,
  CREATE_STUDENT,
  CREATE_TEACHER,
  CREATE_CLASSROOM,
  CREATE_SCHEDULE,
  EDIT_STUDENT,
  EDIT_TEACHER,
  EDIT_CLASSROOM,
  EDIT_SCHEDULE,
  VERIFY_TOKEN,
  LOGIN,
  FETCH_CLASSROOM_NAME,
  FETCH_SUBJECT,
  LOGOUT } from './types';

export const verifyToken = () => async dispatch => {
  if(sessionStorage.getItem('auth-token') == null){
    dispatch({ type: VERIFY_TOKEN, payload: 400})
  } else {
    const response = await user.get(`api/user/auth`, {
      headers: {
        'auth-token': sessionStorage.getItem('auth-token')
      }
    });
  }
  
  // dispatch({ type: VERIFY_TOKEN, payload: 200})
}


export const fetchUser = () => async dispatch => {
  // Get user from API
  
  // console.log(header);
  const response = await user.get(`/api/user/get`, {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  }).catch(err => {
    console.log(err);
  });
  // console.log(response.data);
  dispatch({ type: FETCH_USER, payload: response.data })
}

export const fetchClassroom = (classId) => async dispatch => {
  // Get classroom with id from API
  const response = await user.get(`/api/class/get/${classId}`, {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  }).catch(err => {
    console.log(err)
  });

  dispatch({ type: FETCH_CLASSROOM, payload: response.data })
}

export const fetchClassroomName = (classId) => async dispatch => {
  const response = await user.get(`api/class/get/className/${classId}`, {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  }).catch(err => {
    console.log(err)
  });

  dispatch({ type: FETCH_CLASSROOM_NAME, payload: response.data})
}

export const fetchSubject = (subjectId) => async dispatch =>{
  const response = await user.get(`api/class/get/subject/${subjectId}`, {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  }).catch(err => {
    console.log(err)
  });

  dispatch({ type: FETCH_SUBJECT, payload: response.data})
}

export const fetchPosts = (id) => async dispatch => {
  // Get posts with yearId which will be a part of the post id, something like
  // [yearId classId index?] NOT FINAL
  const response = await user.get(`/api/post/get/${id}` , {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  }).catch(err => {
    console.log(err);
  });

  dispatch({ type: FETCH_POSTS, payload: response })
}

export const fetchSchedule = (id) => async dispatch => {
  // Get schedule with classId
  const response = await user.get(`/api/class/get/schedule/${id}` , {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  }).catch(err => {
    console.log(err);
  });
  dispatch({ type: FETCH_SCHEDULE, payload: response })
}

export const fetchRole = () => async dispatch => {
  const response = await user.get(`/api/user/get/role`, {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  }).catch(err => {
    console.log(err);
  })
  dispatch({ type: FETCH_ROLE, payload: response})
}

export const createPost = (formValues, subjectID) => async dispatch => {
  // get Batch
  const classroom = await user.get(`/api/class/get/class/${formValues.class}`, {
    headers: {
      'auth-token': sessionStorage.getItem('auth-token')
    }
  })
  // Create a post from a form
  const formData = {
    class: formValues.class,
    title: formValues.title,
    description: formValues.description,
    dueDate: formValues.dueDate,
    subjectId: subjectID,
    batch: classroom.data.Batch

  };
  const response = await user.post(`/api/post/create`, formData, {
    headers: {
    'Content-type': 'application/json',
    'auth-token': sessionStorage.getItem('auth-token')
  }
  });
  dispatch({ type: CREATE_POST })
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
  const formData = {
    username: formValues.username,
    password: formValues.password
  };
  const response = await user.post(`/api/user/login`, formData, {
    headers: {
    'Content-type': 'application/json'
  }
  });
  sessionStorage.setItem('auth-token', response.data.token);
  // Dispatch to store
  dispatch({type: LOGIN, payload: response.data._id}) 
}


export const logout = () => async dispatch => {
  // LOGOUT
  sessionStorage.removeItem('auth-token');
  dispatch({ type: LOGOUT })
}

