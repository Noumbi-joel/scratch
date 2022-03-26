import React from "react";

import AppNavigator from "./navigation/AppNavigator";

//redux
/* import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux"; */

//reducers

/* const rootReducers = combineReducers({});

const store = createStore(rootReducers); */
/* <Provider store={store}>
    </Provider> */

export default function App() {
  return <AppNavigator />;
}
