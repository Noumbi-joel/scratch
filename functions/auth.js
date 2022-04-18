import { Alert } from "react-native";

//firebase
import firebase from "firebase";

export const onSignUp = async (values) => {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
    const token = await res.user.getIdToken();
    console.log(token);
    return token;
  } catch (err) {
    Alert.alert(
      "Authentication Failed!",
      "Could not sign you up. Please check your credentials or try again later"
    );
  }
};

export const onSignIn = async (values) => {
  try {
    const res = await firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password);
    const token = await res.user.getIdToken();
    console.log(token)
    return token;
  } catch (err) {
    Alert.alert(
      "Authentication Failed!",
      "Could not sign you up. Please check your credentials or try again later"
    );
  }
};
