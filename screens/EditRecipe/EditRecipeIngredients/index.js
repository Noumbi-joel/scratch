import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditRecipeIngredients = (props) => {
  return (
    <View style={styles.container}>
      <Text>EditRecipe Ingredients</Text>
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

export default EditRecipeIngredients;
