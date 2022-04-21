import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const LoadingOverlay = (props) => {
  if (props.newRecipe) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={props.colors.green} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={props.colors.green} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: { alignItems: "center" },
});

export default LoadingOverlay;
