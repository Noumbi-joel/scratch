import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import { SvgXml } from "react-native-svg";
import plus from "../../assets/svg/plus";

const UploadBtn = (props) => {
  if (props.small) {
    return (
      <TouchableOpacity style={styles.smallContainer}>
        <SvgXml xml={plus} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.container}>
      <SvgXml xml={plus} />
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  smallContainer: {
    width: 62,
    height: 62,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UploadBtn;
