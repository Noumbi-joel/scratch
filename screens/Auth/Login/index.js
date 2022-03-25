import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

//svg xml
import { SvgXml } from "react-native-svg";

//svg
import logo from "../../../assets/svg/logo";
import logoText from "../../../assets/svg/centered-logo";
//import loginBg from "../../../assets/svg/login-bg";
import loginBg from "../../../assets/png/login-bg.png";

//constants
import Constants from "expo-constants";

//colors
import colors from "../../../utils/colors";

//components
import CustomButton from "../../../components/Button";

const Login = (props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.loginHeader}>
        <View style={styles.logoContainer}>
          <SvgXml xml={logo} />
          <SvgXml xml={logoText} width="50%" />
        </View>
        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Image source={loginBg} />
      </View>

      <Text style={styles.pleaseText}>Please login to continue.</Text>

      <Text style={[styles.emailText, { marginTop: 10 }]}>Email address</Text>
      <TextInput
        style={styles.textInput}
        autoComplete="off"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <Text style={styles.emailText}>Password</Text>
        <Text style={styles.forgotPass}>Forgot Password?</Text>
      </View>
      <TextInput
        style={styles.textInput}
        autoComplete="off"
        secureTextEntry={true}
      />

      <View style={{ alignSelf: "center", alignItems: "center" }}>
        <CustomButton big btnName="Login" />
        <Text style={{ marginTop: 10, color: colors.grey_text }}>New to Scratch?</Text>
        <TouchableOpacity style={{ marginTop: 5 }}>
          <Text style={styles.createAcc}>Create Account Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  createAcc: {
    color: colors.green,
    fontWeight: "700",
    fontSize: 16
  },
  loginBtn: {
    backgroundColor: colors.green,
    height: 50,
    width: 325,
    fontSize: 16,
    fontWeight: "700",
  },
  pleaseText: {
    color: "#606060",
    marginLeft: 25,
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 30,
  },
  forgotPass: {
    fontSize: 14,
    color: "#606060",
    lineHeight: 22,
    fontWeight: "400",
    marginRight: 20,
  },
  emailText: {
    fontSize: 14,
    color: colors.grey_text,
    lineHeight: 22,
    fontWeight: "400",
    marginLeft: 25,
  },
  textInput: {
    width: 320,
    height: 32,
    marginLeft: 20,
    paddingVertical: 5,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.btn,
  },
  loginHeader: {
    position: "relative",
    alignItems: "center",
    alignSelf: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 99,
    left: 25,
    top: 10,
  },
  welcomeText: {
    position: "absolute",
    zIndex: 99,
    top: 130,
    left: 25,
    fontSize: 24,
    fontWeight: "700",
    color: colors.black,
  },
});

export default Login;
