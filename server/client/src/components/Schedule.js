import React, { Component } from 'react';

class Schedule extends Component{
    render(){
        return(
            <div className="item">
                <div className="content">
                    <div className="header">
                        {this.props.schedule[0]}
                    </div>
                    <div className="description">
                        {this.props.schedule[1]}
                    </div>
                </div>
            </div>
        )
    }
}

export default Schedule;
