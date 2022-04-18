import firebase from "firebase";

//constants
import { FETCH_USER, SWITCH_LOADING, CHANGE_IMG } from "../../constants";

export const fetchUser = (opType, imgUrl) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    try {
      dispatch({ type: SWITCH_LOADING, loading: true });
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();
      if (snapshot.exists) {
        if (opType === CHANGE_IMG) {
          return dispatch({ type: CHANGE_IMG, payload: imgUrl });
        } else {
          return dispatch({ type: FETCH_USER, payload: snapshot.data() });
        }
      } else {
        console.log("user does not exist");
      }
    } catch (err) {
      console.log("error while fetching profile data: " + err);
    } finally {
      dispatch({ type: SWITCH_LOADING, loading: false });
    }
  }
};

export const updateProfile = (opType, imgUrl) => async (dispatch) => {
  let url;
  const user = firebase.auth().currentUser;
  if (user !== null) {
    try {
      dispatch({ type: SWITCH_LOADING, loading: true });

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => reject(new TypeError("Network Request Failed"));
        xhr.responseType = "blob";
        xhr.open("GET", imgUrl, true);
        xhr.send(null);
      });

      const ref = firebase.storage().ref().child(new Date().toISOString());
      const snapshot = ref.put(blob);

      snapshot.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (error) => {
          console.log(error);
          blob.close();
          return;
        },
        async () => {
          url = await snapshot.snapshot.ref.getDownloadURL();
          console.log("download url: " + url);
          dispatch({ type: CHANGE_IMG, payload: url });
          blob.close();
          return url;
        }
      );
    } catch (err) {
      console.log("error while uploading in storage: " + err);
    } finally {
      dispatch({ type: SWITCH_LOADING, loading: false });
    }

    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
          imageUrl: "https://www.tailorbrands.com/wp-content/uploads/2020/06/mcdonalds-logo-a-1.png",
        });
      console.log("it is good for firestore!");
    } catch (err) {
      console.log("error while updating in firestore: " + err);
    }
  }
};
