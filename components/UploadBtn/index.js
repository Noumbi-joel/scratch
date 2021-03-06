import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { SvgXml } from "react-native-svg";
import plus from "../../assets/svg/plus";

const UploadBtn = (props) => {
  if (props.small) {
    if (props.image) {
      return (
        <TouchableOpacity
          style={styles.smallContainer}
          onPress={() => props.pickImage("partOne")}
        >
          <Image
            source={{ uri: props.image }}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity style={styles.smallContainer} onPress={props.pickImage}>
        <SvgXml xml={plus} />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity style={styles.container} onPress={props.launchModal}>
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
    overflow: "hidden",
  },
});

export default UploadBtn;
