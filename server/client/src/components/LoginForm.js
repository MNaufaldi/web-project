import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login } from '../actions/index'


class LoginForm extends React.Component {
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
  
    onSubmit = (formValues) => {
      console.log(formValues);
      // this.props.login(formValues);
    }
  
    render() {
      return (
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="ui form error"
        >
          <Field 
          name="username" 
          component={this.renderInput} 
          label="Username" 
          className="field"/>
          <Field
            name="password"
            component={this.renderInput}
            label="Password"
            className="field"
          />
          <button className="ui button primary">Submit</button>
        </form>
      );
    }
  }
  
  const validate = formValues => {
    const errors = {};
  
    if (!formValues.username) {
      errors.username = 'You must enter a username';
    }
  
    if (!formValues.password) {
      errors.password = 'You must enter a password';
    }
  
    return errors;
  };

  const formWrap = reduxForm({
    form: 'PostsNewForm', 
    validate
  })(LoginForm);
  
  export default connect(null, { login })(formWrap);
