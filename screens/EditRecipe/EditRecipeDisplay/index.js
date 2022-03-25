import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditRecipe = (props) => {
  return (
    <View style={styles.container}>
      <Text>Edit Recipe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditRecipe;
