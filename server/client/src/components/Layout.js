import React, { Component } from 'react';
import Navbar from './Navbar'
import ScheduleList from './ScheduleList'

class Layout extends Component{
    render(){
        return(
            <div className= "ui grid">
                <div className="three wide column">
                    <Navbar />
                </div>
                <div className="ten wide stretched column">
                    {this.props.children}
                </div>
                <div className="three wide column">
                    <ScheduleList />
                </div>
            </div>
        )
    }
}

export default Layout;