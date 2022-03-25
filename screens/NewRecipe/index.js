import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NewRecipe = (props) => {
  return (
    <View style={styles.container}>
      <Text>New Recipe</Text>
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

export default NewRecipe;
