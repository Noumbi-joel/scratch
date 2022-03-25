import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchFilter = (props) => {
  return (
    <View style={styles.container}>
      <Text>Search Filter</Text>
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

export default SearchFilter;
