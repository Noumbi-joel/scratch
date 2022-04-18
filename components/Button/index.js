import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../utils/colors";

import { AntDesign } from "@expo/vector-icons";

const Button = (props) => {
  if (props.big) {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={
          props.filterBtn
            ? [styles.big, { width: 255 }]
            : [
                styles.big,
                { backgroundColor: props.color ? props.color : colors.green },
              ]
        }
      >
        <Text style={styles.btnName}>{props.btnName}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={
        props.widthIncrease
          ? [styles.small, { width: 130, height: 40 }]
          : [styles.small]
      }
      onPress={() => props.onPress()}
    >
      {props.icon==="close" && <AntDesign name="close" size={20} color={colors.green} />}
      <Text style={[styles.btnName, { color: colors.green }]}>
        {props.btnName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  big: {
    backgroundColor: colors.green,
    width: 315,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  small: {
    backgroundColor: colors.white,
    width: 105,
    height: 30,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.green,
  },
  btnName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Button;
