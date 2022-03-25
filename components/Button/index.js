import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../utils/colors";

const Button = (props) => {
  return (
    <TouchableOpacity style={props.big ? styles.big : styles.small}>
      <Text style={styles.btnName}>{props.btnName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  big: {
    backgroundColor: colors.green,
    width: 325,
    height: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  small: {
    backgroundColor: colors.green,
    width: 120,
    height: 50,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  btnName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Button;
