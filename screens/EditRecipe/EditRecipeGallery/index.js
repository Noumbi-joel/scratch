import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//svg
import { SvgXml } from "react-native-svg";
import closeModal from "../../../assets/svg/close_modal";

const EditRecipeGallery = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.subContainer, { backgroundColor: props.colors.white }]}
      >
        <View style={styles.rowContainer}>
          <Text style={[styles.modalTitle, { color: props.colors.black }]}>
            Edit Gallery
          </Text>
          <SvgXml xml={closeModal} onPress={() => props.closeModal()} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  subContainer: {
    position: "absolute",
    padding: 10,
    bottom: 0,
    width: "100%",
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowOpacity: 0.1,
    shadowColor: "#ccc",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 2,
    shadowRadius: 2,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default EditRecipeGallery;
