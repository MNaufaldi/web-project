import Post from './Post'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchRole } from '../../actions';

class Posts extends Component{
    componentDidMount(){
        this.props.fetchRole()
        if('ClassID' in this.props.user_details && 'Batch' in this.props.user_details){
            this.props.fetchPosts(this.props.user_details.ClassID[this.props.user_details.ClassID.length - 1]
                .concat(this.props.user_details.Batch))
                .catch((err) => {
                    console.log(err);
            });
        }
        else{
            this.props.fetchPosts(this.props.userId)
            .catch((err) => {
                console.log(err);
            });
        }
        
    }

    renderList() {
        return this.props.posts.map(post => {
            // console.log(post);
          return (
            <Post post={post} key={post._id} role={this.props.role}/>
          );
        });
      }

    render(){
        if (!this.props.posts) {
            // Replace with loader
            return <div>Loading</div>
        }
        return(
            <div className="ui large feed">
                {this.renderList()}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return { posts: state.post.posts, user_details: state.auth.user_details, userId: state.auth.userId, role: state.auth.role };
}


export default connect(
    mapStateToProps,
    { fetchPosts, fetchRole }
  )(Posts);
