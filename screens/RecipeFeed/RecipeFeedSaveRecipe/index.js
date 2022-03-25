import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecipeFeedSaveRecipe = (props) => {
  return (
    <View style={styles.container}>
      <Text>RecipeFeed SaveRecipe</Text>
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

export default RecipeFeedSaveRecipe;
