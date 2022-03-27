import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

//components
import Recipe from "../../../components/Recipe";

const RecipeFeedDisplay = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Recipe />
        <Recipe />
        <Recipe />
        <Recipe />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RecipeFeedDisplay;
