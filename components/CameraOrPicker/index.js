import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

//components
import Button from "../Button";

//image picker
import * as ImagePicker from "expo-image-picker";

//redux
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/actions/user";

const index = (props) => {
  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      dispatch(updateProfile("imageUploading", result.uri));
      props.setModalVisible(false);
    }
  };

  const takeImage = async () => {
    const arg1 = await ImagePicker.requestCameraPermissionsAsync();
    const arg2 = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (arg1.status !== "granted" && arg2.status !== "granted") {
      console.log(`[ pickFromCamera ] access: ${arg1.status}`);
      console.log(
        `[ pickFromCamera ] access: ${arg2.status}`
      );
    } else {
      const res = await ImagePicker.launchCameraAsync();
      dispatch(updateProfile("imageUploading", res.uri));
      props.setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Button saveRecipe btnName="Camera" onPress={takeImage} />
        <Button saveRecipe btnName="Gallery" onPress={pickImage} />
        <Button
          saveRecipe
          btnName="close"
          icon="close"
          onPress={() => props.setModalVisible(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default index;
