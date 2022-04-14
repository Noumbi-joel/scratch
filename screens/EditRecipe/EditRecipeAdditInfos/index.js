import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

//svg
import { SvgXml } from "react-native-svg";
import closeModal from "../../../assets/svg/close_modal";

//icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

//components
import Button from "../../../components/Button";

const EditRecipeAdditInfos = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.subContainer, { backgroundColor: props.colors.white }]}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.modalTitle}>Additional Infos</Text>

          <SvgXml xml={closeModal} onPress={() => props.closeModal()} />
        </View>
        <Text style={styles.label}>
          Serving Time (
          <MaterialCommunityIcons
            name="plus-minus"
            size={20}
            color={props.colors.grey_text}
          />
          ) min
        </Text>
        <TextInput value="20" style={styles.textInput} />
        <Text style={styles.label}>Nutrition Facts</Text>
        <TextInput
          value="222 calorie 6.2 g fat 7.2 g carbohydrates 28.6 g protein"
          style={styles.textInput}
        />
        <Text style={styles.label}>Tags</Text>
        <TextInput
          value="Sweet, Lunch, Quick, Budget"
          style={styles.textInput}
        />

        <View style={{ alignItems: "center" }}>
          <Button big btnName="Save Info" />
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
  textInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  label: {
    color: "#a8a8a8",
    fontSize: 16,
    marginTop: 10,
  },
});

export default EditRecipeAdditInfos;
