import React from 'react';
import { logout } from '../actions/';
import { connect } from 'react-redux';

class Logout extends React.Component{
    componentDidMount(){
        this.props.logout();
        this.props.history.push('/login');
    }

    render(){
        return null
    }
}

export default connect(null, {logout})(Logout)