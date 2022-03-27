import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal } from "react-native";

//svg xml
import { SvgXml } from "react-native-svg";

import { EvilIcons } from "@expo/vector-icons";

//screens
import RecipeFeedSaveRecipe from "../../screens/RecipeFeed/RecipeFeedSaveRecipe";

//images
import profileImg from "../../assets/png/damon.jpg";
import raisin from "../../assets/png/raisin.jpg";

//components
import Button from "../Button";

//colors
import colors from "../../utils/colors";

const Recipe = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <RecipeFeedSaveRecipe setModalVisible={setModalVisible} />
      </Modal>
      <View style={styles.recipe}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={profileImg}
            style={{
              width: 32,
              height: 32,
              margin: 10,
              borderRadius: 12,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: colors.black,
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 16,
              }}
            >
              Profile Name
            </Text>
            <Text
              style={{
                color: "#767676",
                fontSize: 12,
                fontWeight: "400",
                lineHeight: 16,
              }}
            >
              2h ago
            </Text>
          </View>
        </View>
        <Image source={raisin} style={{ width: "100%", height: "65%" }} />

        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 5,
          }}
        >
          <Text
            style={{
              color: colors.black,
              fontSize: 18,
              fontWeight: "600",
              marginRight: 5,
            }}
          >
            Red Wine and Mint Soufflé
          </Text>
          <EvilIcons name="heart" size={24} color="#363837" />
        </View>
        <Text
          style={{ alignSelf: "center", color: colors.grey_text, width: 245 }}
        >
          Apparently we had reached a great height ...
        </Text>

        <View style={styles.footerContainer}>
          <Text style={{ color: "#606060" }}>32 likes</Text>
          <Text style={{ color: "#606060" }}>8 Comments</Text>
          <Button saveRecipe setModalVisible={setModalVisible}  btnName="Save" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  recipe: {
    width: 300,
    overflow: "hidden",
    marginHorizontal: 10,
    height: 500,
    borderColor: colors.grey,
    borderRadius: 8,
    shadowOpacity: 0.1,
    shadowColor: colors.green,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 2,
    shadowRadius: 2,
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default Recipe;
