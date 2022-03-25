import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EditRecipeAdditInfos = (props) => {
  return (
    <View style={styles.container}>
      <Text>EditRecipe Additional Infos</Text>
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

export default EditRecipeAdditInfos;
