import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../utils/colors";

import { Slider } from "@miblanchard/react-native-slider";
import Button from "../Button";

const FilterCard = () => {
  const [value, setValue] = useState(0.2);
  return (
    <View style={styles.container}>
      <View style={styles.filterCard}>
        <Text style={styles.text}>Search Filter</Text>
        <View style={styles.filterGroup}>
          <Text style={styles.dataText}>Ingredients</Text>
          <Slider
            value={value}
            trackStyle={{ backgroundColor: "#e6e6e6" }}
            thumbTintColor={colors.green}
            onValueChange={(value) => setValue(value)}
          />
        </View>
        <View style={styles.filterGroup}>
          <Text style={styles.dataText}>Serving Time</Text>
          <Slider
            value={value}
            trackStyle={{ backgroundColor: "#e6e6e6" }}
            thumbTintColor={colors.green}
            onValueChange={(value) => setValue(value)}
          />
        </View>
        <Text style={styles.text}>Search For</Text>
        <View style={styles.filterBtnContainer}>
          <Button btnName="Apply Filter" big filterBtn />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  filterBtnContainer: {
    alignItems: "center",
  },
  filterCard: {
    width: 325,
    height: 320,
    backgroundColor: colors.white,
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
  dataText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
  filterGroup: {
    marginVertical: 15,
  },
});

export default FilterCard;
