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
              .doc(user.uid)
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

export const saveGallery = (data) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  const galleries = [];
  if (user !== null) {
    dispatch({ type: SAVE_GALLERY_LOADING, payload: true });
    try {
      data.map((imageGallery) => {
        const blob = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = () => reject(new TypeError("Network Request Failed"));
          xhr.responseType = "blob";
          xhr.open("GET", imageGallery, true);
          xhr.send(null);
        });

        const ref = firebase
          .storage()
          .ref(
            `images/${user.email}/recipes/gallery/${new Date().toISOString()}`
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
            galleries.push(url);
            blob.close();
            return url;
          }
        );
      });
      try {
        await firebase.firestore().collection(RECIPES).doc(user.uid).update({
          recipeGalleryImages: galleries,
        });
        dispatch({ type: SAVE_RECIPE_GALLERY, payload: galleries });
      } catch (err) {
        console.log("error while updating firestore: " + err);
      }
    } catch (err) {
      console.log("error while uploading in storage: " + err);
    } finally {
      dispatch({ type: SAVE_GALLERY_LOADING, loading: false });
    }
  }
};

export const saveIngredients = (data) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  const ingredients = [];
  if (user !== null) {
    dispatch({ type: SAVE_INGREDIENTS_LOADING, payload: true });
    try {
      data.map((ingredient) => {
        const blob = new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = () => reject(new TypeError("Network Request Failed"));
          xhr.responseType = "blob";
          xhr.open("GET", ingredient.image, true);
          xhr.send(null);
        });

        const ref = firebase
          .storage()
          .ref(
            `images/${user.email}/recipes/gallery/${new Date().toISOString()}`
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
            ingredients.push({ url: url, name: ingredient.name });
            blob.close();
            return url;
          }
        );
      });
      try {
        await firebase.firestore().collection(RECIPES).doc(user.uid).update({
          recipeIngredients: ingredients,
        });
        dispatch({ type: SAVE_RECIPE_INGREDIENTS, payload: ingredients });
      } catch (err) {
        console.log("error while updating firestore: " + err);
      }
    } catch (err) {
      console.log("error while uploading in storage: " + err);
    } finally {
      dispatch({ type: SAVE_INGREDIENTS_LOADING, loading: false });
    }
  }
};

export const saveRecipe = (data) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    dispatch({ type: SAVE_REST_LOADING, payload: true });
    try {
      await firebase.firestore().collection(RECIPES).doc(user.uid).update({
        recipeHowToCook: data.howToCook,
        recipeAdditionals: data.additionals,
        type: data.type,
      });
      dispatch({
        type: SAVE_RECIPE,
        payload: {
          type: data.type,
          howToCook: data.howToCook,
          additionals: data.additionals,
        },
      });
    } catch (err) {
      console.log("error while updating firestore: " + err);
    } finally {
      dispatch({ type: SAVE_REST_LOADING, loading: false });
    }
  }
};
