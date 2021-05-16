import React from 'react';
// import { reduxForm } from 'redux-form';

class LoginForm extends React.Component{
    render(){
        return (
            <form className="ui large form" action="/login" method="POST">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input type="text" name="username" placeholder="Username"></input>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input type="password" name="password" placeholder="Password"></input>
                        </div>
                    </div>
                <div className="ui primary button" type="submit">Login</div>
            </form>
        );
    }
}
   

export default LoginForm
