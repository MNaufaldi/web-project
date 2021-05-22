import React, { Component } from 'react';
import { connect } from 'react-redux';

// const Post = ({ post }) => {
//     return (
//         <div className="column" style={{marginBottom: '5%'}}>
//             <div className="ui card" style={{position: 'relative', width: '100%'}}>
//                 <div className="content">
//                     <img src="#" className="left floated mini ui image"></img>
//                     <div className="header">
//                         {post.teacherName}
//                     </div>
//                     <div className="meta">
//                         {post.subject}
//                     </div>
//                 </div>
//                 <div className="content">
//                     <div className="header">
//                         {post.title}
//                     </div>
//                     <div className="meta">
//                         {post.due}
//                     </div>
//                     <div className="description">
//                         <p>{post.content}</p>
//                     </div>

//                 </div>


//             </div>

//         </div>
//     )
// }

class Post extends Component{
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


export default Post