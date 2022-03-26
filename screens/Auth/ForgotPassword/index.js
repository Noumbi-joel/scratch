import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Text>Forgot Password</Text>
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

export default ForgotPassword;
