import React from "react";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";

//colors
import colors from "../../utils/colors";

//components
import Button from "../Button";

import closeModal from "../../assets/svg/close_modal";

import { SvgXml } from "react-native-svg";

const NewRecipeModal = (props) => {
  if (props.gallery) {
    return (
      <View style={styles.container}>
        <View style={[styles.subContainer, { height: 125 }]}>
          <SvgXml
            xml={closeModal}
            style={{ alignSelf: "flex-end" }}
            onPress={props.closeModal}
          />
          <View style={styles.rowContainer}>
            <Button
              widthIncrease
              btnName="Pick"
              onPress={() => {
                props.pickImage();
              }}
            />
            <Button widthIncrease btnName="Finish" onPress={props.saveData} />
          </View>
        </View>
      </View>
    );
  }

  if (props.ingredients) {
    return (
      <View style={styles.container}>
        <View style={[styles.subContainer, { height: 150 }]}>
          <SvgXml
            xml={closeModal}
            style={{ alignSelf: "flex-end" }}
            onPress={() => props.closeModal}
          />
          <TextInput
            value={props.value}
            onChangeText={props.handleChange}
            style={styles.textInput}
          />
          <View style={styles.rowContainer}>
            <Button
              widthIncrease
              btnName="Pick"
              onPress={() => {
                props.pickImage();
              }}
            />
            <Button widthIncrease btnName="Finish" onPress={props.saveData} />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TextInput
          value={props.value}
          onChangeText={(val) => props.handleChang(val)}
          style={styles.textInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  subContainer: {
    padding: 15,
    backgroundColor: "#fff",
    width: "100%",
    height: 200,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: colors.grey,
    shadowOpacity: 0.1,
    shadowColor: colors.green,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 2,
    shadowRadius: 2,
    justifyContent: "center",
  },
  textInput: {
    width: "100%",
    borderRadius: 10,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.black,
    marginTop: 5
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default NewRecipeModal;
