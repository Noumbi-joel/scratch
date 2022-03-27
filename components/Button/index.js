import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../utils/colors";

import { AntDesign } from "@expo/vector-icons";

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.setModalVisible(true)}
      style={props.big ? styles.big : styles.small}
    >
      {!props.small ? (
        <AntDesign name="plus" size={24} color={colors.green} />
      ) : (
        <AntDesign name="caretright" size={20} color={colors.green} />
      )}
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
    backgroundColor: colors.white,
    width: 90,
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
    color: colors.green,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default Button;
