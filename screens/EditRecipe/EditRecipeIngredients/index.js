import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

//svg
import { SvgXml } from "react-native-svg";
import closeModal from "../../../assets/svg/close_modal";
import redTrash from "../../../assets/svg/red-trash";
import pen from "../../../assets/svg/pen";
import decolored_pen from "../../../assets/svg/decolored_pen";

//components
import UploadBtn from "../../../components/UploadBtn";
import Button from "../../../components/Button";

const ingsList = ["1 heap of Ocean Bloom", "3 batches of Water Cudweed"];

const EditRecipeIngredients = (props) => {
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
        {ingsList.map((ing, index) => (
          <View style={[styles.rowContainer, { marginTop: 15 }]} key={index}>
            <TextInput editable={false} value={ing} style={[styles.ingText, { color: props.colors.black }]} />
            <SvgXml xml={decolored_pen} onPress={() => console.log(`toggle input #${index}`)} />
          </View>
        ))}
        <UploadBtn title="Add Ingredient" />
        <View style={{ alignItems: "center" }}>
          <Button big btnName="Save Ingredients" />
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
    padding: 15,
    bottom: 0,
    width: "100%",
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: { fontSize: 20, fontWeight: "700" },
  ingText: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#30be76",
    width: "70%"
  },
});

export default EditRecipeIngredients;
