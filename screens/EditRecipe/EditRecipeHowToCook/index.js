import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";

//svg
import { SvgXml } from "react-native-svg";
import closeModal from "../../../assets/svg/close_modal";
import decolored_pen from "../../../assets/svg/decolored_pen";

//components
import Button from "../../../components/Button";
import UploadBtn from "../../../components/UploadBtn";

const EditRecipeHowToCook = (props) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.subContainer, { backgroundColor: props.colors.white }]}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.modalTitle}>Edit Directions</Text>
          <SvgXml xml={closeModal} onPress={() => props.closeModal()} />
        </View>
        <ScrollView>
          <View style={[styles.rowContainer, { marginVertical: 10 }]}>
            <View
              style={[
                styles.rowContainer,
                { alignItems: "flex-start", justifyContent: "flex-start" },
              ]}
            >
              <View style={styles.listNb}>
                <Text>1</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value="Heat a Belgian waffle iron."
                editable={false}
              />
            </View>
            <SvgXml xml={decolored_pen} />
          </View>
          <View style={[styles.rowContainer, { marginVertical: 10 }]}>
            <View
              style={[
                styles.rowContainer,
                { alignItems: "flex-start", justifyContent: "flex-start" },
              ]}
            >
              <View style={styles.listNb}>
                <Text>2</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value="Mix the flour, sugar, and baking powder..."
                editable={false}
              />
            </View>
            <SvgXml xml={decolored_pen} />
          </View>
          <View style={[styles.rowContainer, { marginVertical: 10 }]}>
            <View
              style={[
                styles.rowContainer,
                { alignItems: "flex-start", justifyContent: "flex-start" },
              ]}
            >
              <View style={styles.listNb}>
                <Text>3</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value="Mix the flour, sugar, and baking powder..."
                editable={false}
              />
            </View>
            <SvgXml xml={decolored_pen} />
          </View>
          <View style={[styles.rowContainer, { marginVertical: 10 }]}>
            <View
              style={[
                styles.rowContainer,
                { alignItems: "flex-start", justifyContent: "flex-start" },
              ]}
            >
              <View style={styles.listNb}>
                <Text>4</Text>
              </View>
              <TextInput
                style={styles.textInput}
                value="Mix the flour, sugar, and baking powder..."
                editable={false}
              />
            </View>
            <SvgXml xml={decolored_pen} />
          </View>
        </ScrollView>
        <UploadBtn title="Add Directions" />
        <View style={{ alignItems: "center" }}>
          <Button big btnName="Save Directions" />
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
    height: 400,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  listNb: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#30be76",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginLeft: 10,
    width: "80%",
  },
});

export default EditRecipeHowToCook;
