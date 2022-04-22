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

const copy = [];

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

export const saveGallery = (data) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    dispatch({ type: SAVE_GALLERY_LOADING, payload: true });
    try {
      await Promise.all(
        data.map(async (item, index) => {
          const blob = await _blob(item);
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
              console.log(`download url n*${index + 1}: ` + url);
              copy.push(url);
              try {
                console.log(copy);
                await firebase
                  .firestore()
                  .collection(RECIPES)
                  .doc(user.uid)
                  .update({
                    recipeGalleryImages: copy,
                  });
                dispatch({ type: SAVE_RECIPE_GALLERY, payload: copy });
                copy = [];
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
    } finally {
      dispatch({ type: SAVE_GALLERY_LOADING, loading: false });
    }
  }
};

export const saveIngredients = (data) => async (dispatch) => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    dispatch({ type: SAVE_INGREDIENTS_LOADING, payload: true });
    try {
      await Promise.all(
        data.map(async (item) => {
          const blob = await _blob(item.image);
          const ref = firebase
            .storage()
            .ref(
              `images/${
                user.email
              }/recipes/ingredients/${new Date().toISOString()}`
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
              try {
                copy.push({ url: url, name: item.name });
                await firebase
                  .firestore()
                  .collection(RECIPES)
                  .doc(user.uid)
                  .update({
                    recipeIngredients: copy,
                  });
                dispatch({ type: SAVE_RECIPE_INGREDIENTS, payload: copy });
                copy = [];
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
    } finally {
      dispatch({ type: SAVE_INGREDIENTS_LOADING, loading: false });
    }
  }
};

export const saveRecipe =
  (type, howToCook, additionals) => async (dispatch) => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      dispatch({ type: SAVE_REST_LOADING, payload: true });
      try {
        await firebase.firestore().collection(RECIPES).doc(user.uid).update({
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
      } catch (err) {
        console.log("error while updating firestore: " + err);
      } finally {
        dispatch({ type: SAVE_REST_LOADING, loading: false });
      }
    }
  };
/* const [first, snd, third] = await new Promise.all([
      _blob(),
      firebase
        .storage()
        .ref(`images/${user.email}/recipes/gallery/${new Date().toISOString()}`)
        .put(first),
      snd.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (error) => {
          console.log(error);
          first.close();
          return;
        },
        async () => {
          const url = await snapshot.snapshot.ref.getDownloadURL();
          console.log(`download url n*${index + 1}: ` + url);
          try {
            const snapshot = await firebase
              .firestore()
              .collection(RECIPES)
              .doc(user.uid)
              .get();
            if (snapshot.exists) {
              const copy = [...snapshot.data().recipeGalleryImages];
              copy.push(url);
              await firebase
                .firestore()
                .collection(RECIPES)
                .doc(user.uid)
                .update({
                  recipeGalleryImages: copy,
                });
              dispatch({ type: SAVE_RECIPE_GALLERY, payload: copy });
            }
          } catch (err) {
            console.log("error while updating firestore: " + err);
          }
          first.close();
          return url;
        }
      ),
    ]); */

/* for (const item in data) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = () => reject(new TypeError("Network Request Failed"));
          xhr.responseType = "blob";
          xhr.open("GET", item, true);
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
            console.log(`download url: ` + url);
            try {
              const snapshot = await firebase
                .firestore()
                .collection(RECIPES)
                .doc(user.uid)
                .get();
              if (snapshot.exists) {
                const copy = [...snapshot.data().recipeGalleryImages];
                copy.push(url);
                await firebase
                  .firestore()
                  .collection(RECIPES)
                  .doc(user.uid)
                  .update({
                    recipeGalleryImages: copy,
                  });
                dispatch({ type: SAVE_RECIPE_GALLERY, payload: copy });
              }
            } catch (err) {
              console.log("error while updating firestore: " + err);
            }
            blob.close();
            return url;
          }
        );
      } */
