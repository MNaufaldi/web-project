import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../../actions/';
import user from '../../apis/students';


class CreatePost extends React.Component {
  state = {
    classroomName: {}
  };
  async componentDidMount(){
  this.props.user_details.ClassID.map(async className => {
    await user.get(`api/class/get/className/${className}`, {
      headers: {
        'auth-token': sessionStorage.getItem('auth-token')
      }
    }).then(res => {
      var kp = {[className]:res.data}
      this.setState({classroomName:{...this.state.classroomName, ...kp} })
      return res.data
    })
    .catch(err => {
      console.log(err)
    });
    // this.setState({classroomName:{...this.state.classroomName, ...toadd} })
    // console.log(this.state.classroomName)
  });
    
  }

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  
  renderDate = ({ input, label, meta, dateNow }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" type='date' min={dateNow}/>
        {this.renderError(meta)}
      </div>
    );
  }

  renderTextArea = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <textarea {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  renderOptions = (input) => {
    return this.props.user_details.ClassID.map(className => {
      return (
        <option value={className} key={className}>{this.state.classroomName[className]}</option>
      );
  });
}

  renderSelect = ({input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return(
      <div className={className}>
        <label>{label}</label>
        <select {...input}>
          <option></option>
          {this.renderOptions(input)}
        </select>
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = (formValues) => {
    this.props.createPost(formValues, this.props.user_details.SubjectID).then(async (response) => {
      this.props.handler()
    }).catch(error => {
      console.log(error);
    });  
  }
  
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field 
        name="class" 
        component={this.renderSelect} 
        label="Class" 
        className="field">
        </Field>
        <Field
          name="title"
          component={this.renderInput}
          label="Title"
          className="field"
        />
        <Field
          name="description"
          component={this.renderTextArea}
          label="Description"
          className="field"
        />
        <Field
        name="dueDate"
        component={this.renderDate}
        label="Due date"
        className="field"
        dateNow={this.props.dateNow}
      />
        <button className="ui button primary" >Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.class) {
    errors.class = 'You must choose a class';
  }

  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }

  if (!formValues.description) {
    errors.description = 'You must enter a description';
  }
  if (!formValues.dueDate) {
    errors.dueDate = 'You must select a due date';
  }
  return errors;
};

const formWrap = reduxForm({
  form: 'PostsNewForm', 
  validate
})(CreatePost);

const mapStateToProps = state => {
  var date = new Date(new Date().getTime() - new Date().getTimezoneOffset()*60*1000).toISOString().substr(0,10).replace('T', ' ');
  return {
    user_details: state.auth.user_details, dateNow: date
  };
};

export default connect(mapStateToProps, { createPost })(formWrap);
