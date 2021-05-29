import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import $ from 'jquery';


class CreatePost extends React.Component {
    componentDidMount(){
      $('#calendar').calendar({
        type: 'date'
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


      renderCalendar = ({ input, label, meta }) => {
        const className = `ui calendar ${meta.error && meta.touched ? 'error' : ''}`;
        return(
          <div className={className} id="calendar">
            <label>{label}</label>
            <div className="ui input left icon">
              <i className="calendar icon"></i>
              <input {...input} placeholder="Date"></input>
            </div>
          </div>
        );
      };
      
      renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
          <div className={className} ref={this.calendar}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
            {this.renderError(meta)}
          </div>
        );
      };
    
      onSubmit = formValues => {
        this.props.createStream(formValues);
      };
    
      render() {
        return (
          <form
            onSubmit={this.props.handleSubmit(this.onSubmit)}
            className="ui form error"
          >
            <Field 
            name="title" 
            component={this.renderInput} 
            label="Enter Title" 
            className="field" />
            <Field
              name="description"
              component={this.renderInput}
              label="Enter Description"
            />
            <Field
              name="description"
              component={this.renderCalendar}
              label="Enter Description"
            />
            <button className="ui button primary">Submit</button>
          </form>
        );
      }
    }
    
    const validate = formValues => {
      const errors = {};
    
      if (!formValues.title) {
        errors.title = 'You must enter a title';
      }
    
      if (!formValues.description) {
        errors.description = 'You must enter a description';
      }
    
      return errors;
}

const formWrapped = reduxForm({
    form: 'CreatePost',
    validate
  })(CreatePost);
  
  export default connect(
    null,
    { CreatePost }
  )(formWrapped);

// const CreateAssignment = () => {
//     return (
//         <div>
//             <form className="ui form">
//                 <div className="field">
//                     <label>Title</label>
//                     <input type="text" name="title" placeholder="Title"></input>
//                 </div>
//                 <div className="field">
//                     <label>Description</label>
//                     <textarea></textarea>
//                 </div>
//                 <div className="field">
//                     <label>Date</label>
//                     <div className="ui calendar">
//                         <div className="ui input left icon">
//                             <i class="calendar icon"></i>
//                             <input type="text" placeholder="Pick up a date" name="date"></input>
//                         </div>        
//                     </div>
//                 </div>
//                 <button class="ui primary button">Save</button>
//                 <button class="ui button">Discard</button>
//             </form>
//         </div>
//     )
// }

