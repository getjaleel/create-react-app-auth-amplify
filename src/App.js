//Start React code
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

const AuthStateApp = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        onAuthUIStateChange((nextAuthState, authData) => {
          console.log(nextAuthState);
          console.log(authData);
          setAuthState(nextAuthState);
          setUser(authData)
        });
    }, []);

    let pageContents = <AmplifyAuthenticator />

    if (authState === "confirmSignUp" ) {
      pageContents = (<AmplifySignIn 
        style={{ 
        display: 'flex',
        justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            height: '100vh'
      }}
      headerText="Your request is awaiting administrator's approval."
      slot="sign-in"/>)
    } else if (authState === AuthState.SignedIn && user) {
      pageContents = (
        <div className="App">
          <div>User Id: {user.username}</div>
          <p>Phone: {user.attributes.phone_number}</p>
          <p>Email: {user.attributes.email}</p>
          <AmplifySignOut />
        </div>
      )
    }

  return (
    <div>
      <img src="/banner.svg" alt="Banner" style={{width: '100%'}}/>
      <img src="/Logo.png" alt="Logo" style={{marginBottom: '20px'}}/>
      {pageContents}
    </div>
  )
}

export default AuthStateApp;

//End React code
