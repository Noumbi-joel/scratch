import React from "react";
import { View, Text, StyleSheet } from "react-native";

const List = (props) => {
  if (props.addInfos) {
    return (
      <View>
        <View style={styles.container}>
          <Text style={{ color: props.colors.grey_text }}>Serving Time</Text>
          <View>
            <Text style={[styles.text, { color: props.colors.black }]}>
              {props.addInfosList.servingTime}
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={{ color: props.colors.grey_text }}>Nutrition Facts</Text>
          <View>
            {props.addInfosList.nutritionFact.map((item, index) => (
              <Text
                style={[styles.text, { color: props.colors.black }]}
                key={index}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.container}>
          <Text style={{ color: props.colors.grey_text }}>Tags</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {props.addInfosList.tags.map((item, index) => (
              <Text
                style={[styles.text, { color: props.colors.black }]}
                key={index}
              >
                {item}{", "}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
  return (
    <>
      {props.htk.map((item, index) => (
        <View style={styles.container} key={index}>
          <View
            style={[styles.ingNbContainer, { borderColor: props.colors.green }]}
          >
            <Text style={{ color: props.colors.green }}>{index + 1}</Text>
          </View>
          <Text style={[styles.ing, { color: props.colors.black }]}>
            {item.title}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  ingNbContainer: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  ing: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
    width: "85%",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 22,
  },
});

export default List;
