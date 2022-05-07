import React from "react";
import {
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const index = (props) => {
  return (
    <ScrollView>
      {props.recipes && (
        <View
          style={
            props.recipesList.length
              ? styles.scrollViewContent
              : styles.scrollViewContentCentered
          }
        >
          {!props.recipesList.length && <Text>No recipes 😉</Text>}
          <>
            {props.recipesList.map((recipe) => (
              <TouchableOpacity
                style={styles.touchable}
                /* onPress={() => props.navigation.navigate("BrowseMyRecipeDisplay")} */
              >
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", height: 90 }}
                  source={{ uri: recipe.recipeMainImage }}
                />
                <Text
                  style={[styles.touchableText, { color: props.colors.black }]}
                >
                  {recipe.recipeName}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        </View>
      )}

      {props.saved && (
        <View
          style={
            props.savedRecipes.length
              ? styles.scrollViewContent
              : styles.scrollViewContentCentered
          }
        >
          {!props.savedRecipes.length && <Text>No saved recipes 😉</Text>}
          <>
            {props.savedRecipes.map((recipe) => (
              <TouchableOpacity
                style={styles.touchable}
                onPress={() =>
                  props.navigation.navigate("BrowseMyRecipeDisplay")
                }
              >
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", height: 90 }}
                  source={{ uri: recipe.recipeImg }}
                />
                <Text
                  style={[styles.touchableText, { color: props.colors.black }]}
                >
                  {recipe.recipeName}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        </View>
      )}
      {props.following && (
        <>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => props.navigation.navigate("BrowseMyRecipeDisplay")}
          >
            <Image
              resizeMode="cover"
              style={{ width: "100%", height: 90 }}
              source={props.raisin}
            />
            <Text style={[styles.touchableText, { color: props.colors.black }]}>
              Following
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  scrollViewContentCentered: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  touchable: {
    width: 150,
    height: 132,
    margin: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
  },
  touchableText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 5,
  },
});

export default index;
