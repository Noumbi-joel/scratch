import { StyleSheet } from 'react-native'

//constants
import Constants from "expo-constants";

//colors
import colors from "../../../utils/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  createAcc: {
    color: colors.green,
    fontWeight: "700",
    fontSize: 16,
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
    marginLeft: 20,
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
    marginLeft: 20,
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

export default styles;