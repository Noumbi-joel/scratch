import React from "react";

//global app navigation
import AppNavigator from "./navigation/AppNavigator";

//env vars
import envs from "./config";


//redux
/* import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux"; */

//reducers

/* const rootReducers = combineReducers({});

const store = createStore(rootReducers); */
/* <Provider store={store}>
    </Provider> */

const firebaseConfig = {
  apiKey: envs.apiKey,
  authDomain: envs.authDomain,
  projectId: envs.projectId,
  storageBucket: envs.storageBucket,
  messagingSenderId: envs.messagingSenderId,
  appId: envs.appId,
  measurementId: envs.measurementId,
};

let app;

/* if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
} */

export default function App() {
  return <AppNavigator />;
}
