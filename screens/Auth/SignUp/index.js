import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

//svg xml
import { SvgXml } from "react-native-svg";

//styles
import styles from "./styles";

//svg
import logo from "../../../assets/svg/logo";
import logoText from "../../../assets/svg/centered-logo";
//import loginBg from "../../../assets/svg/login-bg";
import loginBg from "../../../assets/png/login-bg.png";

//colors
import colors from "../../../utils/colors";

//components
import CustomButton from "../../../components/Button";

//validators
import * as Yup from "yup";
import { Formik } from "formik";

//firebase
import firebase from "firebase/compat";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short(>=2)!")
    .max(25, "Too Long(<=10)!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email @ and .(com, fr, ...) required")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short(>=6)!")
    .max(10, "Too Long(<=10)!")
    .required("Required"),
});

const SignUp = (props) => {
  
  const onSignUp = (values) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.loginHeader}>
        <View style={styles.logoContainer}>
          <SvgXml xml={logo} />
          <SvgXml xml={logoText} width="50%" />
        </View>
        <Text style={styles.welcomeText}>Start</Text>
        <Text style={[styles.welcomeText, { top: 155 }]}>From Scratch</Text>
        <Image source={loginBg} />
      </View>

      <Text style={styles.pleaseText}>Create account to continue.</Text>

      <Formik
        initialValues={{ fullName: "", email: "", password: "" }}
        onSubmit={(values) => onSignUp(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Text style={[styles.emailText, { marginTop: 10 }]}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              autoComplete="off"
              onChangeText={handleChange("fullName")}
              onBlur={handleBlur("fullName")}
              value={values.fullName}
            />
            {errors && <Text style={styles.label}>{errors.fullName}</Text>}

            <Text style={[styles.emailText, { marginTop: 10 }]}>Email</Text>
            <TextInput
              style={styles.textInput}
              autoComplete="off"
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors && <Text style={styles.label}>{errors.email}</Text>}

            <View style={styles.passwordContainer}>
              <Text style={styles.emailText}>Password</Text>
            </View>
            <TextInput
              style={styles.textInput}
              autoComplete="off"
              secureTextEntry={true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
            />
            {errors && <Text style={styles.label}>{errors.password}</Text>}

            <View style={{ alignSelf: "center", alignItems: "center" }}>
              <CustomButton
                {...props}
                big
                btnName="Create Account"
                onPress={handleSubmit}
              />
              <Text style={{ marginTop: 10, color: colors.grey_text }}>
                Already have an account?
              </Text>
              <TouchableOpacity
                style={{ marginTop: 5, marginBottom: 5 }}
                onPress={() => props.navigation.goBack()}
              >
                <Text style={styles.createAcc}>Login Here</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignUp;
