import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

//validators
import * as Yup from "yup";
import { Formik } from "formik";

//images and icons
import damon from "../../../assets/png/damon.jpg";

//colors
import colors from "../../../utils/colors";

//components
import Button from "../../../components/Button";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(1, "Too Short!")
    .max(51, "Too Long!")
    .required("Required"),
  bio: Yup.string()
    .min(1, "Too Short!")
    .max(101, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

const EditProfile = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.editProfileText}>Edit Profile</Text>

      <TouchableOpacity
        style={styles.uploadContainer}
        onPress={() => console.log("upload photo")}
      >
        <Image
          source={damon}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
          }}
        />
        <Text style={styles.btnText}>Edit Profile Picture</Text>
      </TouchableOpacity>

      <ScrollView>
        <Formik
          initialValues={{ fullName: "", bio: "", email: "", phone: "" }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, handleBlur, values, errors }) => (
            <View style={{ marginTop: 20 }}>
              <View style={styles.labelInputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("fullName")}
                  value={values.fullName}
                />
                {errors && (
                  <Text style={[styles.label, { color: "red" }]}>
                    {errors.fullName}
                  </Text>
                )}
              </View>
              <View style={styles.labelInputContainer}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("bio")}
                  value={values.bio}
                />
                {errors && (
                  <Text style={[styles.label, { color: "red" }]}>
                    {errors.bio}
                  </Text>
                )}
              </View>

              <Text style={styles.privateText}>Private Information</Text>
              <View style={styles.labelInputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {errors && (
                  <Text style={[styles.label, { color: "red" }]}>
                    {errors.email}
                  </Text>
                )}
              </View>
              <View style={styles.labelInputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange("phone")}
                  value={values.phone}
                  keyboardType="numeric"
                />
                {errors && (
                  <Text style={[styles.label, { color: "red" }]}>
                    {errors.phone}
                  </Text>
                )}
              </View>
              <Button onPress={handleSubmit} btnName="Save Profile" big />
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  privateText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.black,
    marginTop: 20,
  },
  labelInputContainer: {
    marginVertical: 5,
  },
  label: {
    color: colors.grey_text,
  },
  textInput: {
    width: 315,
    borderBottomWidth: 1,
    borderBottomColor: colors.btn,
  },
  editProfileText: {
    fontSize: 24,
    fontWeight: "700",
  },
  uploadContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    fontSize: 16,
    color: colors.green,
  },
});

export default EditProfile;
