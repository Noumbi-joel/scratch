import React from "react";
import { View, Text, StyleSheet } from "react-native";

import colors from "../../../utils/colors";

//svg
import { SvgXml } from "react-native-svg";
import cookingTime from "../../../assets/svg/cooking_time";

const CookingMode = (props) => {
  const video = React.useRef(null);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.cookingModeText}>Cooking Mode</Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SvgXml xml={cookingTime} />
          <Text style={styles.cookingTime}>00:12</Text>
        </View>
      </View>
      <Text
        style={[
          styles.cookingModeText,
          { fontSize: 20, marginLeft: 10, marginTop: 20 },
        ]}
      >
        Almond and Saffron Bonbons
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cookingTime: {
    color: colors.green,
    fontWeight: "bold",
    fontSize: 16,
  },
  cookingModeText: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
});

export default CookingMode;
