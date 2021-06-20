import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from "react-router-dom";
import Layout from './Layout';
import { auth } from './auth';

// export const PrivateRoute = ({ component: Component, handleAuth, ...rest }) => {
//   console.log(auth())
//   return (
//     <Route {...rest} render={props => auth()
//       ? (
//         <Layout><Component {...props} /></Layout>
//       ) : (
//         console.log(handleAuth)
//         // <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//       )
//     } />
//   )
// }

export const PrivateRoute = ({ component: Comp, redirectto, ...rest }) => {

  /* Track the state of your app instead. Start with a "loading" state */
  const [state, setState] = useState('loading');

  useEffect(() => {
    (async function() {
      try {
        /* Update effect logic to track correct state */
        const isUserLogged = await auth();
        setState(isUserLogged ? 'loggedin' : 'redirect');
        if(isUserLogged == undefined){
          return(
          setState('redirect'));
        }
      }
      catch {
        setState('redirect');
      }
    })();
  }, []);
  
  /* If in loading state, return loading message while waiting for 
  isValidToken to complete */
  if(state === 'loading') {
    return <div>Loading..</div>
  }

  return (
    <Route
      {...rest}
      render={props => ((state === 'loggedin') ? 
        <Layout><Comp {...props} /></Layout> :
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ) }
    />
  );
};

export default withRouter(PrivateRoute);