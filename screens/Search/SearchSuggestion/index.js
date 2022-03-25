import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SearchSuggestion = (props) => {
  return (
    <View style={styles.container}>
      <Text>Search and Suggestion</Text>
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

export default SearchSuggestion;
