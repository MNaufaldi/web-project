import Schedule from './Schedule'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSchedule } from '../actions';

class ScheduleList extends Component{
    componentDidMount(){
        if('ClassID' in this.props.user_details && 'Batch' in this.props.user_details){
            this.props.fetchSchedule(this.props.user_details.ClassID[this.props.user_details.ClassID.length - 1])
                .catch((err) => {
                    console.log(err);
            });
        }
        else{
            this.props.fetchSchedule(this.props.userId)
            .catch((err) => {
                console.log(err);
            });
        }
    }

    renderList() {
        return this.props.schedule.map(schedule => {
          return (
            <Schedule schedule={schedule} key={this.props.schedule.indexOf(schedule)}/>
          );
        });
      }


    render(){
        if (!this.props.schedule) {
            // Replace with loader
            return null
        }
        return(
            <div className="ui relaxed divided list" style={{position: "sticky", height: "100vh"}}>
                {this.renderList()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { schedule: state.schedule.schedules, user_details: state.auth.user_details, userId: state.auth.userId };
}

export default connect(
    mapStateToProps,
    { fetchSchedule }
  )(ScheduleList);
