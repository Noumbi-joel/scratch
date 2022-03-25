import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ViewRecipe = (props) => {
  return (
    <View style={styles.container}>
      <Text>View Recipe</Text>
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

export default ViewRecipe;
