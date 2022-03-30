import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { SvgXml } from "react-native-svg";

//images
import damon from "../../assets/png/damon.jpg";
import pen from "../../assets/svg/decolored_pen";

//colors
import colors from "../../utils/colors";

const ProfileHeader = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: 325,
        alignSelf: "center",
        /* borderWidth: 1,
        borderColor: "red", */
        borderBottomWidth: 1,
        borderBottomColor: "#979797",
        paddingVertical: 20,
      }}
    >
      <Image
        source={damon}
        style={{ width: 82, height: 82, borderRadius: 50 }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "68%",
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "700", color: colors.black }}
          >
            Nick Evans
          </Text>
          {!props.noIcon && (
            <SvgXml
              xml={pen}
              onPress={() => props.navigation.navigate("EditProfile")}
            />
          )}
        </View>
        <Text style={{ fontSize: 14, color: "#606060" }}>Potato Master</Text>
        <View
          style={
            props.noIcon
              ? {
                  flexDirection: "row",
                  alignItems: "center",
                  width: "70%",
                }
              : {
                  flexDirection: "row",
                  alignItems: "center",
                  width: "50%",
                }
          }
        >
          <Text style={{ fontSize: 14, color: "#606060" }}>
            584 followers .
          </Text>
          <Text style={{ fontSize: 14, color: "#606060" }}> 23k likes</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
