import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CookingModeFullScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>CookingMode FullScreen</Text>
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

export default CookingModeFullScreen;
