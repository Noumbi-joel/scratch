import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OtherUserProfile = (props) => {
  return (
    <View style={styles.container}>
      <Text>Other User Profile</Text>
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

export default OtherUserProfile;
