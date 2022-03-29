import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";

//colors
import colors from "../../utils/colors";

//svg
import { SvgXml } from "react-native-svg";
import arrowRight from "../../assets/svg/arrow-right";

const instructions = [
  [
    { text: "Notify me for followers" },
    { text: "When someone send me a message" },
    { text: "When someone do live cooking" },
  ],

  [
    { text: "Followers can see my saved recipes" },
    { text: "Followers can see profiles I follow" },
  ],
];

const Settings = (props) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.settingText}>Settings</Text>
      <Text style={styles.label}>Push Notifications</Text>
      {instructions[0].map((inst, index) => (
        <View style={styles.instructionContainer} key={index}>
          <Text style={[styles.label, { fontSize: 16, color: colors.black }]}>
            {inst.text}
          </Text>
          <Switch
            trackColor={{ false: colors.btn, true: colors.green }}
            thumbColor={colors.white}
            ios_backgroundColor={colors.btn}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      ))}
      <View style={styles.separator}></View>
      <Text style={styles.label}>Privacy Settings</Text>
      {instructions[1].map((inst, index) => (
        <>
          <View style={styles.instructionContainer} key={index}>
            <Text style={[styles.label, { fontSize: 16, color: colors.black }]}>
              {inst.text}
            </Text>
            <Switch
              trackColor={{ false: colors.btn, true: colors.green }}
              thumbColor={colors.white}
              ios_backgroundColor={colors.btn}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {index == instructions.length - 2 && (
            <View style={styles.explainContainer}>
              <Text style={styles.explain}>
                If disabled, you won’t be able to see recipes saved by other
                profiles. Leave this enabled to share your collected recipes to
                others. why this matter?
              </Text>
            </View>
          )}
        </>
      ))}
      <View style={styles.separator}></View>
      <TouchableOpacity style={styles.changePassContainer}>
        <Text style={[styles.label, { fontSize: 16, color: colors.black }]}>
          Change Password
        </Text>
        <SvgXml xml={arrowRight} />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  changePassContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }, 
  explainContainer: {
    backgroundColor: "#e6e6e6",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  explain: {
    color: "#606060",
    lineHeight: 22,
  },
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 10,
    backgroundColor: "#e6e6e6",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingText: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  label: {
    color: "#606060",
    marginVertical: 20,
  },
});

export default Settings;
