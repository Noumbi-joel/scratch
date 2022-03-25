import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UserProfile = (props) => {
  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
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

export default UserProfile;
