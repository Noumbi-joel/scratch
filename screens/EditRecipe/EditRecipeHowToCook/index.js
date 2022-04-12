import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditRecipeHowToCook = (props) => {
  return (
    <View style={styles.container}>
      <Text>EditRecipe HowToCook</Text>
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

export default EditRecipeHowToCook;
