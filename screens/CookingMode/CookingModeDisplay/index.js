import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import colors from "../../../utils/colors";

//components
import VideoPlayer from "../../../components/Video";

//svg
import { SvgXml } from "react-native-svg";
import cookingTime from "../../../assets/svg/cooking_time";

const cookingSteps = [
  { nb: 1, text: "Heat a Belgian waffle iron." },
  {
    nb: 2,
    text: "Mix the flour, sugar, and baking powder together in a mixing bowl. Stir in 1 cup eggnog, butter, and the egg until well blended. Add more eggnog if needed to make a pourable batter.",
  },
  {
    nb: 3,
    text: "Lightly grease or spray the waffle iron with non-stick cooking spray. Pour some batter onto the preheated waffle iron, close the top, and cook until golden brown and crisp on both sides. Waffles are usually cooked with steam subsides. Transfer waffles to a serving plate, and keep warm.",
  },
  {
    nb: 4,
    text: "Meanwhile, place the raspberry preserves in a pan, and heat over medium heat until pourable.",
  },
  {
    nb: 5,
    text: "To serve, drizzle raspberry preserves over each waffle, and top with raspberries. If desired, add a dollop of whipped cream to each waffle.",
  },
];

const CookingMode = (props) => {
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
      <VideoPlayer />
      <View style={styles.tableColumnContainer}>
        <Text style={[styles.tableColumn, { color: colors.black }]}>Steps</Text>
        <Text style={[styles.tableColumn, { color: colors.green }]}>
          View Ingredients
        </Text>
      </View>
      <ScrollView>
        {cookingSteps.map((step, index) => (
          <View key={index} style={styles.tableRowContainer}>
            <View style={styles.cookingStepContainer}>
              <Text style={styles.rowNb}>{step.nb}</Text>
            </View>
            <Text style={styles.rowText}>{step.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowNb: {
    fontWeight: "bold",
  },
  rowText: {
    color: colors.black,
    width: "90%",
  },
  cookingStepContainer: {
    width: 25,
    height: 25,
    borderColor: colors.green,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginRight: 10,
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
  tableColumnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  tableRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginVertical: 5
  },
  tableColumn: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default CookingMode;
