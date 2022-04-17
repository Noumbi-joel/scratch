import firebase from "firebase/compat";

const fetchUser = () => (dispatch) => {
    firebase.firestore()
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists){
                dispatch({type: USER})
            }
        })
}