//constants
import {
  FETCH_RECIPE,
  SAVE_RECIPE,
  SAVE_RECIPE_GALLERY,
  SAVE_RECIPE_IMAGE_NAME,
  SAVE_RECIPE_INGREDIENTS,
  SAVE_GALLERY_LOADING,
  SAVE_INGREDIENTS_LOADING,
  SAVE_REST_LOADING,
  SAVE_NAME_IMAGE_LOADING,
  UPDATE_RECIPE,
  RECIPES,
  LIKE,
  LIKE_RECIPE,
  FETCH_ALL_RECIPES,
  FETCH_ALL_RECIPES_LOADING,
  USERS,
  SAVED_RECIPE,
} from "../../constants";

//firebase
import firebase from "firebase";

export const saveNameImage = (data) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    dispatch({ type: SAVE_NAME_IMAGE_LOADING, payload: true });
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => reject(new TypeError("Network Request Failed"));
        xhr.responseType = "blob";
        xhr.open("GET", data.image, true);
        xhr.send(null);
      });

      const ref = firebase
        .storage()
        .ref(`images/${user.email}/recipes/banner/${new Date().toISOString()}`);
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
          try {
            const res = await firebase
              .firestore()
              .collection(RECIPES)
              .doc(`${user.uid}-${data.name}`)
              .set({
                type: "",
                recipeName: data.name,
                recipeMainImage: url,
                recipeGalleryImages: [],
                recipeIngredients: [],
                recipeHowToCook: [],
                recipeAdditionals: [],
                isSaved: [],
                nbLike: [],
                isTrend: false,
                userData: {
                  email: user.email,
                  photoUrl: user.photoURL,
                  name: user.displayName,
                },
                uid: user.uid,
                createdAt: new Date().toISOString(),
                comments: [],
              });
            console.log(res);
            dispatch({
              type: SAVE_RECIPE_IMAGE_NAME,
              payload: {
                type: "",
                recipeName: data.name,
                recipeMainImage: url,
                recipeGalleryImages: [],
                recipeIngredients: [],
                recipeHowToCook: [],
                recipeAdditionals: [],
                isSaved: [],
                nbLike: [],
                isTrend: false,
                userData: user.providerData[0],
                createdAt: new Date().toISOString(),
                comments: [],
                uid: user.uid,
              },
            });
          } catch (err) {
            console.log("error while saving recipe: " + err);
          }
          blob.close();
          return url;
        }
      );
    } catch (err) {
      console.log("error while uploading in storage: " + err);
    } finally {
      dispatch({ type: SAVE_NAME_IMAGE_LOADING, loading: false });
    }
  }
};

const _blob = async (val) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => reject(new TypeError("Network Request Failed"));
    xhr.responseType = "blob";
    xhr.open("GET", val, true);
    xhr.send(null);
  });
  return blob;
};

export const saveGallery = (data, name) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    try {
      await Promise.all(
        data.map(async (item, index) => {
          const blob = await _blob(item);
          const ref = firebase
            .storage()
            .ref(
              `images/${
                user.email
              }/recipes/gallery/gallery-${new Date().toISOString()}`
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
              dispatch({ type: SAVE_GALLERY_LOADING, payload: true });
              const url = await snapshot.snapshot.ref.getDownloadURL();
              console.log(`download url n*${index + 1}: ` + url);
              try {
                await firebase
                  .firestore()
                  .collection(RECIPES)
                  .doc(`${user.uid}-${name}`)
                  .update({
                    recipeGalleryImages:
                      firebase.firestore.FieldValue.arrayUnion(url),
                  });
                dispatch({ type: SAVE_RECIPE_GALLERY, payload: url });
                dispatch({ type: SAVE_GALLERY_LOADING, loading: false });
              } catch (err) {
                console.log("error while updating firestore: " + err);
              }
              blob.close();
              return url;
            }
          );
        })
      );
    } catch (err) {
      console.log("error while uploading in storage: " + err);
    }
  }
};

export const saveIngredients = (data, name) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    try {
      await Promise.all(
        data.map(async (item) => {
          const blob = await _blob(item.image);
          const ref = firebase
            .storage()
            .ref(
              `images/${
                user.email
              }/recipes/ingredients/ingredient-${new Date().toISOString()}`
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
              dispatch({ type: SAVE_INGREDIENTS_LOADING, payload: true });
              const url = await snapshot.snapshot.ref.getDownloadURL();
              console.log("download url: " + url);
              try {
                await firebase
                  .firestore()
                  .collection(RECIPES)
                  .doc(`${user.uid}-${name}`)
                  .update({
                    recipeIngredients: firebase.firestore.FieldValue.arrayUnion(
                      { url: url, name: item.name }
                    ),
                  });
                dispatch({
                  type: SAVE_RECIPE_INGREDIENTS,
                  payload: { url: url, name: item.name },
                });
                dispatch({ type: SAVE_INGREDIENTS_LOADING, loading: false });
              } catch (err) {
                console.log("error while updating firestore: " + err);
              }
              blob.close();
              return url;
            }
          );
        })
      );
    } catch (err) {
      console.log("error while uploading in storage: " + err);
    }
  }
};

export const saveRecipe =
  (type, howToCook, additionals, name) => async (dispatch) => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      dispatch({ type: SAVE_REST_LOADING, payload: true });
      try {
        await firebase
          .firestore()
          .collection(RECIPES)
          .doc(`${user.uid}-${name}`)
          .update({
            recipeHowToCook: howToCook,
            recipeAdditionals: additionals,
            type: type,
          });
        dispatch({
          type: SAVE_RECIPE,
          payload: {
            type: type,
            howToCook: howToCook,
            additionals: additionals,
          },
        });
        dispatch({ type: SAVE_REST_LOADING, loading: false });
      } catch (err) {
        console.log("error while updating firestore: " + err);
      }
    }
  };

export const fetchRecipes = () => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    dispatch({ type: FETCH_ALL_RECIPES_LOADING, payload: true });
    try {
      const snapshot = await firebase.firestore().collection(RECIPES).get();
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          dispatch({ type: FETCH_ALL_RECIPES, payload: doc.data() });
        });
      }
    } catch (err) {
      console.log("error while fetching recipes: " + err);
    } finally {
      dispatch({ type: FETCH_ALL_RECIPES_LOADING, payload: false });
    }
  }
};

export const handleLike =
  (nbLikes, likerEmail, recipeName, uid) => async (dispatch) => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      const currentStatus = !nbLikes.includes(likerEmail);
      try {
        await firebase
          .firestore()
          .collection(RECIPES)
          .doc(uid + "-" + recipeName)
          .update({
            nbLike: currentStatus
              ? firebase.firestore.FieldValue.arrayUnion(likerEmail)
              : firebase.firestore.FieldValue.arrayRemove(likerEmail),
          });
        dispatch({
          type: LIKE_RECIPE,
          payload: {
            recipeName: recipeName,
            currentStatus: currentStatus,
            likerEmail: likerEmail,
          },
        });
      } catch (err) {
        console.log("error while liking recipe: " + err);
      }
    }
  };
