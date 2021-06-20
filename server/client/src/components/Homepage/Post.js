import React, { Component } from 'react';
import user from '../../apis/students';
import { connect } from 'react-redux';


class Post extends Component{
    state={
        subjectName: null,
        classroomName: null
    }
    async componentDidMount(){
        await user.get(`api/class/get/subject/${this.props.post.SubjectID}`, {
            headers: {
                'auth-token': sessionStorage.getItem('auth-token')
            }
            }).then(res => {
                this.setState({subjectName: res.data})
            }).catch(err => {
            console.log(err)
            });
        if(this.props.role =="Teacher"){
            await user.get(`api/class/get/className/${this.props.post.ClassID}`, {
                headers: {
                  'auth-token': sessionStorage.getItem('auth-token')
                }
              }).then(res => {
                  this.setState({classroomName: res.data})
              }).catch(err => {
                console.log(err)
              });
        }
        
    }
    renderDateCreated(){
        if(this.props.post.Date_created == 0){
            return(
                <div className="date">
                Today
                </div>
            )
        } else if(this.props.post.Date_created == 1){
            <div className="date">
                Yesterday
                </div>
        } else {
            const str = this.props.post.Date_created + " days ago"
            return(
                <div className="date">
                    {str}
                </div>
            )
        }
    }

    renderDateDue(){
        if(this.props.post.Date_due == 0){
            return(
                <a className="ui red horizontal label">Due today</a>
            )
        } else if(this.props.post.Date_due == 1){
            return(
                <a className="ui red horizontal label">Due tomorrow</a>
            )
        } else {
            const str = "Due in " + this.props.post.Date_due + " days"
            return(
                <a className="ui red horizontal label">{str}</a>
            )
        }
    }

    renderClassroom(){
        if(this.props.role == "Student"){
            return null
        } else if(this.props.role == "Teacher"){
            return(
                <div className="meta">
                    <a className="ui yellow horizontal label">{this.state.classroomName}</a>
                </div>
            )
        }
    }

    renderSubject(){
        return(
            <a className="ui orange horizontal label">{this.state.subjectName}</a>
        )
    }

    render(){
        return(
            <div className="event">
                <div className="label">
                    <img src="#"></img>
                </div>
                <div className="content">
                    
                    <div className="summary">
                        {this.props.post.Title}
                        {this.renderDateCreated()}
                    </div>
                    <div className="text">
                    {this.props.post.Description}
                    </div>
                    <div className="meta">
                    {this.renderDateDue()}
                    </div>
                    <div className="meta">
                    {this.renderSubject()}
                    </div>
                    {this.renderClassroom()}
                </div>
            </div>
        )
    }
}

export default connect(
    null
  )(Post);