import firebase from "firebase";

//constants
import {
  FETCH_USER,
  SWITCH_LOADING,
  CHANGE_IMG,
  UPDATE_PROFILE,
} from "../../constants";

export const fetchUser = () => async (dispatch) => {
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
        return dispatch({ type: FETCH_USER, payload: snapshot.data() });
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

export const updateProfile =
  (opType, imgUrl, email, fullName, phone) => async (dispatch) => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      dispatch({ type: SWITCH_LOADING, loading: true });
      if (opType === UPDATE_PROFILE) {
        try {
          dispatch({ type: UPDATE_PROFILE, payload: { email, fullName, phone } });
          return await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
            email: email,
            fullName: fullName,
            phone: phone,
          });
        }catch (err) {
          console.log("error while updating profile data: " +err)
        }finally {
          dispatch({ type: SWITCH_LOADING, loading: false });
        }
      } else {
        try {
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
              const url = await snapshot.snapshot.ref.getDownloadURL();
              console.log("download url: " + url);
              dispatch({ type: CHANGE_IMG, payload: url });
              try {
                await firebase
                  .firestore()
                  .collection("users")
                  .doc(firebase.auth().currentUser.uid)
                  .update({
                    imageUrl: url,
                  });
              } catch (err) {
                console.log("error while updating firestore: " + err);
              }
              blob.close();
              return url;
            }
          );
        } catch (err) {
          console.log("error while uploading in storage: " + err);
        } finally {
          dispatch({ type: SWITCH_LOADING, loading: false });
        }
      }
    }
  };
