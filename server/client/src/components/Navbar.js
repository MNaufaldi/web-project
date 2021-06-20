import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchUser, fetchRole } from '../actions/';
import CreatePostModal from './CreatePostPage/CreatePostModal';

class Navbar extends React.Component {
    async componentDidMount() {
        await this.props.fetchUser();
        await this.props.fetchRole();
    }

    renderUser(names){
        return(
            <div className="item">

                <img class="ui mini image" src="/images/logo.png"></img>
                <h3 className="ui header">
                    {`${names.First_name} ${names.Last_name}`}
                </h3>
            </div>
        )
    }

    renderLinks(){
        if(this.props.role === 'Student') return (
            <div className="ui left fluid vertical menu vertical-menu" style={{height: "100vh" }}>
                    {this.renderUser(this.props.user)}
                    <Link to='/dashboard' className="item">Home</Link>
                    <Link to='/logout' className="item">Logout</Link>
            </div>
        )
        else if(this.props.role === 'Teacher') return(
            <div className="ui left fluid vertical menu vertical-menu" style={{height: "100vh" }}>
                    {this.renderUser(this.props.user)}
                    <Link to='/dashboard' className="item">Home</Link>
                    <CreatePostModal />
                    <Link to='/logout' className="item">Logout</Link>
            </div>
        )
    }

    render(){
        if (!this.props.user) {
            // Replace with loader
            return <div>Loading</div>
        }

        return (
            <div>
                {this.renderLinks()}
            </div>
        )
    }
    
}

const mapStateToProps = state => {
    return {
      userId: state.auth.userId,
      isSignedIn: state.auth.isSignedIn,
      user: state.auth.user,
      role: state.auth.role
    };
  };

// export default Navbar
export default connect(
    mapStateToProps,
    { fetchUser, fetchRole }
  )(Navbar);