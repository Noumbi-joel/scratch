import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";

//screens
import RecipeFeedSaveRecipe from "../../screens/RecipeFeed/RecipeFeedSaveRecipe";

//images and icons
import profileImg from "../../assets/png/damon.jpg";
import raisin from "../../assets/png/raisin.jpg";
import { Ionicons } from "@expo/vector-icons";

//components
import Button from "../Button";

//colors
import colors from "../../utils/colors";

//firebase
import firebase from "firebase";

//moment
import moment from "moment";

//redux
import { useSelector, useDispatch } from "react-redux";
import { handleLike } from "../../redux/actions/recipe";
import { fetchUser, handleSavedRecipe } from "../../redux/actions/user";

const Recipe = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser.value);
  const savedRecipes = useSelector((state) => state.recipe.savedRecipes);
  const recipes = useSelector((state) => state.recipe.recipes);

  const dispatch = useDispatch();

  /* console.log(currentUser); */
  /* console.log(props.recipe); */
  console.log(currentUser?.savedRecipes);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <RecipeFeedSaveRecipe setModalVisible={setModalVisible} />
      </Modal>
      <View style={styles.recipe}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() =>
            props.navigation.navigate("OtherUserProfile", props.recipe.userData)
          }
        >
          <Image
            source={
              props.recipe
                ? { uri: props.recipe.userData.photoUrl }
                : profileImg
            }
            style={{
              width: 32,
              height: 32,
              margin: 10,
              borderRadius: 12,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: colors.black,
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 16,
              }}
            >
              {props.recipe.userData.name}
            </Text>
            <Text
              style={{
                color: "#767676",
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 16,
              }}
            >
              {moment(props.recipe.createdAt).fromNow()}
            </Text>
          </View>
        </TouchableOpacity>
        <Image
          source={props.recipe ? { uri: props.recipe.recipeMainImage } : raisin}
          resizeMode="cover"
          style={{ width: "100%", height: "60%" }}
        />

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              color: colors.black,
              fontSize: 18,
              fontWeight: "600",
              marginRight: 5,
            }}
          >
            {props.recipe.recipeName}
          </Text>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                handleLike(
                  props.recipe.nbLike,
                  firebase.auth().currentUser.email,
                  props.recipe.recipeName,
                  props.recipe.uid
                )
              )
            }
          >
            <Ionicons
              name={
                props.recipe.nbLike.includes(firebase.auth().currentUser.email)
                  ? "heart"
                  : "heart-outline"
              }
              size={24}
              color={
                props.recipe.nbLike.includes(firebase.auth().currentUser.email)
                  ? "red"
                  : "#363837"
              }
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: "center",
            color: colors.grey_text,
            width: "100%",
            marginVertical: 10,
          }}
        >
          Presented By Food Scratch & Co
        </Text>

        <View style={styles.footerContainer}>
          <Text style={{ color: "#606060" }}>
            {props.recipe.nbLike.length} likes
          </Text>
          <Text style={{ color: "#606060" }}>
            {props.recipe.comments.length} Comments
          </Text>
          <Button
            onPress={() =>
              dispatch(
                handleSavedRecipe(
                  {
                    galleryImg: props.recipe.recipeGalleryImages,
                    ingredients: props.recipe.recipeIngredients,
                    recipeAdditionals: props.recipe.recipeAdditionals,
                    recipeHTK: props.recipe.recipeHowToCook,
                    recipeImg: props.recipe.recipeMainImage,
                    recipeName: props.recipe.recipeName,
                    type: props.recipe.type,
                    uid: props.recipe.uid,
                  },
                  currentUser?.savedRecipes,
                  firebase.auth().currentUser.email
                )
              )
            }
            icon={
              props.recipe.isSaved.includes(firebase.auth().currentUser.email)
                ? "check"
                : ""
            }
            btnName={
              props.recipe.isSaved.includes(firebase.auth().currentUser.email)
                ? "Saved"
                : "Save"
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  recipe: {
    width: 300,
    overflow: "hidden",
    marginHorizontal: 10,
    height: 450,
    borderColor: colors.grey,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowColor: colors.green,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 2,
    shadowRadius: 2,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Recipe;
