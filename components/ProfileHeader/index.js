import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { SvgXml } from "react-native-svg";

//images
import damon from "../../assets/png/damon.jpg";
import pen from "../../assets/svg/decolored_pen";

//colors
import colors from "../../utils/colors";

const ProfileHeader = (props) => {
  if (props.noIcon) {
    return (
      <View style={styles.container}>
        <Image
          source={
            props.profileData?.photoUrl
              ? { uri: props.profileData.photoUrl }
              : damon
          }
          style={styles.imageProfile}
        />
        <View style={styles.subContainer}>
          <View style={styles.rowDivided}>
            <Text style={styles.fullName}>{props.profileData?.name}</Text>
          </View>
          <Text
            style={props.profileData ? styles.textOnline : styles.textOffline}
          >
            {props.profileData ? "Online" : "Offline"}
          </Text>
          <View style={props.noIcon ? styles.noIconTrue : styles.noIconFalse}>
            <Text style={styles.text}>followers .</Text>
            <Text style={styles.text}>likes</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image
        source={
          props.profileData?.imageUrl
            ? { uri: props.profileData.imageUrl }
            : damon
        }
        style={styles.imageProfile}
      />
      <View style={styles.subContainer}>
        <View style={styles.rowDivided}>
          <Text style={styles.fullName}>{props.profileData?.fullName}</Text>
          {!props.noIcon && (
            <SvgXml
              xml={pen}
              onPress={() => props.navigation.navigate("EditProfile")}
            />
          )}
        </View>
        <Text
          style={props.profileData ? styles.textOnline : styles.textOffline}
        >
          {props.profileData ? "Online" : "Offline"}
        </Text>
        <View style={props.noIcon ? styles.noIconTrue : styles.noIconFalse}>
          <Text style={styles.text}>
            {props.profileData?.nbFollowers.length} followers .
          </Text>
          <Text style={styles.text}>
            {props.profileData?.likesByUsers.length} likes
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: 325,
    alignSelf: "center",
    /* borderWidth: 1,
    borderColor: "red", */
    borderBottomWidth: 1,
    borderBottomColor: "#979797",
    paddingVertical: 20,
    overflow: "hidden",
  },
  imageProfile: { width: 82, height: 82, borderRadius: 50 },
  subContainer: { marginLeft: 5, width: 240 },
  rowDivided: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fullName: { fontSize: 16, fontWeight: "700", color: colors.black },
  textOnline: { fontSize: 14, color: colors.green },
  textOffline: { fontSize: 14, color: "red" },
  noIconFalse: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  noIconTrue: {
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
  },
  text: { fontSize: 14, color: "#606060" },
});

export default ProfileHeader;
