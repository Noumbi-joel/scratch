import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RecipeFeedDisplay = (props) => {
  return (
    <View style={styles.container}>
      <Text>Recipe Feed Display</Text>
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

export default RecipeFeedDisplay;
