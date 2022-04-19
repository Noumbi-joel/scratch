import React from "react";
import {
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";

const index = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {props.recipes && (
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
            <Text
              style={[styles.touchableText, {color: props.colors.black}]}
            >
              Recipes
            </Text>
          </TouchableOpacity>
        </>
      )}
      {props.saved && (
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
            <Text
              style={[styles.touchableText, {color: props.colors.black}]}
            >
              Saved
            </Text>
          </TouchableOpacity>
        </>
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
            <Text
              style={[styles.touchableText, {color: props.colors.black}]}
            >
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
