import React from "react";
import {
  View,
  Text,
  StyleSheet,
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
        <Text
          style={styles.forgotPass}
          onPress={() => props.navigation.navigate("forgot")}
        >
          Forgot Password?
        </Text>
      </View>
      <TextInput
        style={styles.textInput}
        autoComplete="off"
        secureTextEntry={true}
      />

      <View style={{ alignSelf: "center", alignItems: "center" }}>
        <CustomButton
          {...props}
          big
          btnName="Login"
          nextStack={["RecipeFeed", "RecipeFeedDisplay"]}
        />
        <Text style={{ marginTop: 10, color: colors.grey_text }}>
          New to Scratch?
        </Text>
        <TouchableOpacity
          style={{ marginTop: 5 }}
          onPress={() => props.navigation.navigate("signup")}
        >
          <Text style={styles.createAcc}>Create Account Here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;
