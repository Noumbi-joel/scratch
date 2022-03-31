import React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import colors from "../../utils/colors";

const RecipeBox = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={props.img}
        resizeMode="cover"
        style={{ width: 150, height: 125 }}
      />
      <Text style={styles.title}>Banana and Mandarin Bun</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 180,
    marginHorizontal: 5,
  },
  title: {
    textAlign: "center",
    color: colors.black,
    fontSize: 16,
  },
});

export default RecipeBox;
