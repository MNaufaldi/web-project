import Schedule from './Schedule'
import React, { Component } from 'react';
import { connect } from 'react-redux';


class ScheduleList extends Component{
    render(){
        return(
            <div className="ui relaxed divided list">
                <Schedule />
            </div>
        )
    }
}

export default ScheduleList;
