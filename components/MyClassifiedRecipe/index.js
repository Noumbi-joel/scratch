import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

//component
import Button from "../Button";

import colors from "../../utils/colors";

//image
import raisin from "../../assets/png/raisin.jpg";

const MyClassifiedRecipe = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <ImageBackground
        source={raisin}
        resizeMode="cover"
        style={{ width: "100%", height: 125 }}
      />
      <Text style={styles.middleText}>Cooked Coconut Mussels</Text>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>± 5 mins</Text>
        <Text style={styles.footerText}>4 ingredients</Text>
        <Button btnName="Cook" small />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 325,
    height: 230,
    borderRadius: 8,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.black,
    marginVertical: 10,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  middleText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#606060",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default MyClassifiedRecipe;
