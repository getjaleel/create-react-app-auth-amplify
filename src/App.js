//Start React code
import React from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
// import * as queries from './graphql/queries';
// import * as mutations from './graphql/mutations';
// import * as subscriptions from './graphql/subscriptions';



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


// Simple query
// const allTodos = await API.graphql({ query: queries.listTodos });
// console.log(allTodos); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }    



      if (authState === "confirmSignUp" ) {
          return   <AmplifySignIn style={{ 
            display: 'flex',
            justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: '100vh'
          }}

          headerText="Your request is awaiting administratori'ss approval.Once approved,you will recieve a notification email."

          slot="sign-in"

        ></AmplifySignIn>

    } else if(authState === AuthState.SignedIn && user) {
    return  <div className="App">
          <div>Hello, {user.username}</div>
          <button onClick={<AmplifySignOut />}> Sign out </button>
      </div>
    }else{
      return  <AmplifyAuthenticator />
    }
}

export default AuthStateApp;

//End React code
