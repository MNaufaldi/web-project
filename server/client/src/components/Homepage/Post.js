import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/'

class Post extends Component{
    componentDidMount(){
        this.props.fetchPosts()
    }
    render(){
        return(
            <div className="event">
                <div className="label">
                    <img src="#"></img>
                </div>
                <div className="content">
                    <div className="date">
                        Just now
                    </div>
                    <div className="summary">
                        <a>Teacher</a> Added an assignment
                    </div>
                    <div className="text">
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </div>
                    <div className="meta">
                        Due date
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(
    null,
    { fetchPosts }
  )(Post);