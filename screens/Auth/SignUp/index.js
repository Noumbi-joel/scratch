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

const SignUp = (props) => {
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

      <Text style={[styles.emailText, { marginTop: 10 }]}>Full Name</Text>
      <TextInput style={styles.textInput} autoComplete="off" />

      <Text style={[styles.emailText, { marginTop: 10 }]}>Email</Text>
      <TextInput
        style={styles.textInput}
        autoComplete="off"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <Text style={styles.emailText}>Password</Text>
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
          btnName="Create Account"
          nextStack={["RecipeFeed", "RecipeFeedDisplay"]}
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
    </ScrollView>
  );
};

export default SignUp;
