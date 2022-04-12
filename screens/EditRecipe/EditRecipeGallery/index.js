import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

//svg
import { SvgXml } from "react-native-svg";
import closeModal from "../../../assets/svg/close_modal";
import trash from "../../../assets/svg/trash";

//components
import ScrollComp from "../../../components/ScrollComp";
import UploadBtn from "../../../components/UploadBtn";
import Button from "../../../components/Button";

import RadioForm from "react-native-simple-radio-button";

var radio_props = [{ label: "Set as Cover", value: 0 }];

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
        <View style={[styles.rowContainer, { marginTop: 20 }]}>
          <Text style={[styles.imageTitle, { color: props.colors.black }]}>
            Images(8)
          </Text>
          <Text style={[styles.imageTitle, { color: props.colors.green }]}>
            View All
          </Text>
        </View>

        <ScrollComp>
          <Image
            resizeMode="cover"
            style={styles.selectedScrolledImg}
            source={props.raisin}
          />
          <Image
            resizeMode="cover"
            style={styles.scrolledImg}
            source={props.raisin}
          />
          <Image
            resizeMode="cover"
            style={styles.scrolledImg}
            source={props.raisin}
          />
          <Image
            resizeMode="cover"
            style={styles.scrolledImg}
            source={props.raisin}
          />
        </ScrollComp>

        <RadioForm style={{marginTop: 10}} radio_props={radio_props} initial={0} />
        <TouchableOpacity
          style={[styles.rowContainer, { justifyContent: "flex-start" }]}
        >
          <SvgXml xml={trash} />
          <Text>Remove</Text>
        </TouchableOpacity>
        <UploadBtn title="Upload Images or Open Camera" />
        <View style={[styles.rowContainer, { justifyContent: "center" }]}>
          <Button big btnName="Save Gallery" />
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrolledImg: {
    width: 130,
    height: 85,
    marginHorizontal: 5,
  },
  selectedScrolledImg: {
    width: 130,
    height: 85,
    borderWidth: 2,
    borderColor: "#30be76",
    marginHorizontal: 5,
  },
});

export default EditRecipeGallery;
