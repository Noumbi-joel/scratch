import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";

//global app navigation
import AppNavigator from "./navigation/AppNavigator";

//env vars
import envs from "./config";

//firebase import
import firebase from "firebase";

//redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducers from "./redux/reducers/index";
import AuthContextProvider from "./store/authContext";

//app-loading
import AppLoading from "expo-app-loading";

import AsyncStorage from "@react-native-async-storage/async-storage";

//reducers
const store = createStore(rootReducers, applyMiddleware(thunk));

//context api
import { AuthContext } from "./store/authContext";

//firebase config
const firebaseConfig = {
  apiKey: envs.apiKey,
  authDomain: envs.authDomain,
  projectId: envs.projectId,
  storageBucket: envs.storageBucket,
  messagingSenderId: envs.messagingSenderId,
  appId: envs.appId,
  measurementId: envs.measurementId,
};

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/actions/user";
import { fetchRecipes } from "./redux/actions/recipe";

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const Root = () => {
  const [isTryingLoggin, setIsTryingLoggin] = useState(true);
  const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.user.currentUser.value);
  const recipesList = useSelector((state) => state.recipe.recipes);


  useEffect(() => {
    //authCtx.saveDb(getFirestore(app));
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLoggin(false);
    };
    fetchToken();
    dispatch(fetchUser());
    dispatch(fetchRecipes());
    console.log(profileData)
    console.log(recipesList)
  }, [dispatch]);

  if (isTryingLoggin) {
    return <AppLoading />;
  }

  return <AppNavigator />;
};

export default function App() {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
