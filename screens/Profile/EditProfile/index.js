import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";

//validators
import * as Yup from "yup";
import { Formik } from "formik";

//images and icons
import damon from "../../../assets/png/damon.jpg";

//colors
import colors from "../../../utils/colors";

//components
import LoadingOverlay from "../../../components/LoadingOverlay";
import Button from "../../../components/Button";
import CameraOrPicker from "../../../components/CameraOrPicker";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateProfile } from "../../../redux/actions/user";
import { UPDATE_PROFILE } from "../../../redux/constants";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .min(1, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
});

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const isLoading = useSelector((state) => state.user.currentUser.isLoading);
  const profileData = useSelector((state) => state.user.currentUser.value);

  const updateProfileData = (values) => {
    dispatch(
      updateProfile(
        UPDATE_PROFILE,
        profileData?.imageUrl,
        values.email,
        values.fullName,
        values.phone
      )
    );
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingOverlay colors={colors} />;
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={modalVisible}
      >
        <CameraOrPicker setModalVisible={setModalVisible} />
      </Modal>
      <View style={styles.container}>
        <Text style={styles.editProfileText}>Edit Profile</Text>

        <TouchableOpacity
          style={styles.uploadContainer}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={
              profileData?.imageUrl ? { uri: profileData.imageUrl } : damon
            }
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
          />
          <Text style={styles.btnText}>Edit Profile Picture</Text>
        </TouchableOpacity>

        <ScrollView style={{ paddingHorizontal: 20 }}>
          <Formik
            initialValues={{
              fullName: profileData?.fullName,
              email: profileData?.email,
              phone: profileData?.phone,
            }}
            onSubmit={(values) => updateProfileData(values)}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 20,
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
