import Post from './Post'
import React, { Component } from 'react';
import { connect } from 'react-redux';
// const Posts = ({ posts }) => {
//     return (
//         <>
//             {posts.map((post) => (
//                 <Post key={post.id} post={post} />
//             ))}
//         </>

//     )
// }

class Posts extends Component{
    render(){
        return(
            <div className="ui large feed">
                <Post />
            </div>
        )
    }
}


export default Posts;
