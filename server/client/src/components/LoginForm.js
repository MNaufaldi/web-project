import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { login, fetchUser } from '../actions/index'

class LoginForm extends React.Component {
  componentDidMount() {
    const user = sessionStorage.getItem('auth-token');
    if (user !== null) {
      this.props.history.push('/dashboard');               
    }
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

    renderPassword = ({ input, label, meta }) => {
      const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
      return (
        <div className={className}>
          <label>{label}</label>
          <input {...input} autoComplete="off" type="password" />
          {this.renderError(meta)}
        </div>
      );
    };
  
    onSubmit = (formValues) => {
      this.props.login(formValues).then(async (response) => {
        await this.props.fetchUser();
        this.props.history.push('/dashboard');
      }).catch(error => {
        alert("Wrong username or password");
      });  
    }
    
    render() {

      return (
        <div className="ui middle aligned center aligned grid" style={{paddingTop: '25vh'}}>
          <div className="four wide column" >
            <div className="ui segment">

            
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
            component={this.renderPassword}
            label="Password"
            className="field"
            />
            <button className="ui button primary" >Submit</button>
        </form>
        </div>
        </div>
        </div>
      
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


  
  export default connect(null, { login, fetchUser })(formWrap);
