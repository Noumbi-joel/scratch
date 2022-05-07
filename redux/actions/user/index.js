//firebase
import firebase from "firebase";

//constants
import {
  FETCH_USER,
  SWITCH_LOADING,
  CHANGE_IMG,
  UPDATE_PROFILE,
  USERS,
  SAVED_RECIPE,
  IS_SAVED_EMAIL,
  RECIPES,
} from "../../constants";

export const fetchUser = () => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    try {
      dispatch({ type: SWITCH_LOADING, loading: true });
      const snapshot = await firebase
        .firestore()
        .collection(USERS)
        .doc(user.uid)
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
          dispatch({
            type: UPDATE_PROFILE,
            payload: { email, fullName, phone },
          });
          return await firebase
            .firestore()
            .collection(USERS)
            .doc(user.uid)
            .update({
              email: email,
              fullName: fullName,
              phone: phone,
            });
        } catch (err) {
          console.log("error while updating profile data: " + err);
        } finally {
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

          const ref = firebase
            .storage()
            .ref(
              `images/${user.email}/profile_images/${new Date().toISOString()}`
            );
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
                try {
                  user.updateProfile({
                    photoURL: url,
                  });
                } catch (err) {
                  console.log("error while updating auth profile: " + err);
                }
                await firebase
                  .firestore()
                  .collection(USERS)
                  .doc(user.uid)
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

export const handleSavedRecipe =
  (recipeObj, savedUserArray, email) => async (dispatch) => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      const currentStatus = !savedUserArray.some((el) => el.recipeName === recipeObj.recipeName)
      console.log(currentStatus);
      try {
        await firebase
          .firestore()
          .collection(RECIPES)
          .doc(`${recipeObj.uid}-${recipeObj.recipeName}`)
          .update({
            isSaved: currentStatus
              ? firebase.firestore.FieldValue.arrayUnion(email)
              : firebase.firestore.FieldValue.arrayRemove(email),
          });
        dispatch({
          type: IS_SAVED_EMAIL,
          payload: {
            recipeName: recipeObj.recipeName,
            currentStatus: currentStatus,
            email: email,
          },
        });
      } catch (err) {
        console.log("error while updating isSaved array: " + err);
      }
      try {
        await firebase
          .firestore()
          .collection(USERS)
          .doc(user.uid)
          .update({
            savedRecipes: currentStatus
              ? firebase.firestore.FieldValue.arrayUnion(recipeObj)
              : firebase.firestore.FieldValue.arrayRemove(recipeObj),
          });
        dispatch({
          type: SAVED_RECIPE,
          payload: { recipeObj: recipeObj, currentStatus: currentStatus },
        });
      } catch (err) {
        console.log(`error while ${uid} save a recipe: ` + err);
      }
    }
  };
