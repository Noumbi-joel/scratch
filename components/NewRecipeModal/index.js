import React from "react";
import { View, StyleSheet, TextInput, Text, Image } from "react-native";

//colors
import colors from "../../utils/colors";

//components
import Button from "../Button";

import closeModal from "../../assets/svg/close_modal";

import { SvgXml } from "react-native-svg";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  servingTime: Yup.number()
    .min(1, "Too short(>=1)")
    .max(3, "Too Hight (<=3)")
    .required("Required"),
  nutritions: Yup.string()
    .min(0, "Too Short(>=1)!")
    .max(100, "Too Long(<=100)!")
    .required("Required"),
  tags: Yup.string()
    .min(0, "Too Short(>=1)!")
    .max(100, "Too Long(<=100)!")
    .required("Required"),
});

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
            <Button widthIncrease btnName="Pick" onPress={props.pickImage} />
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
            onPress={props.closeModal}
          />
          <TextInput
            value={props.value}
            onChangeText={(val) => props.handleChange(val)}
            style={styles.textInput}
          />
          <View style={styles.rowContainer}>
            <Button
              widthIncrease
              btnName={props.htk ? "Add" : "Pick"}
              onPress={props.htk ? props.saveData : props.pickImage}
            />
            <Button
              widthIncrease
              btnName="Finish"
              onPress={props.htk ? props.closeModal : props.saveData}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { height: 300 }]}>
        <SvgXml
          xml={closeModal}
          style={{ alignSelf: "flex-end" }}
          onPress={props.closeModal}
        />
        <Formik
          initialValues={{ servingTime: "", nutritions: "", tags: "" }}
          onSubmit={(values) => {
            props.onSave(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <TextInput
                value={values.servingTime}
                onChangeText={handleChange("servingTime")}
                style={styles.textInput}
                placeholder="Serving Time (hour) Please..."
                keyboardType="numeric"
              />
              {errors && <Text style={styles.label}>{errors.servingTime}</Text>}

              <TextInput
                value={values.nutritions}
                onChangeText={handleChange("nutritions")}
                style={styles.textInput}
                placeholder="Some Nutrition Facts e.g: (25g calories)..."
              />
              {errors && <Text style={styles.label}>{errors.nutritions}</Text>}

              <TextInput
                value={values.tags}
                onChangeText={handleChange("tags")}
                style={styles.textInput}
                placeholder="Please Some Tags..."
              />
              {errors && <Text style={styles.label}>{errors.tags}</Text>}

              <View style={{ alignItems: "center" }}>
                <Button widthIncrease btnName="Finish" onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "red",
  },
  subContainer: {
    padding: 15,
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 300,
    height: 200,
    borderRadius: 10,
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
    marginTop: 5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default NewRecipeModal;
