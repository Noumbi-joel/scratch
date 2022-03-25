import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CookingMode = (props) => {
  return (
    <View style={styles.container}>
      <Text>Cooking Mode</Text>
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

export default CookingMode;
