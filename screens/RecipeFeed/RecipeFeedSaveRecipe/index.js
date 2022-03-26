import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import colors from "../../../utils/colors";

import { AntDesign } from "@expo/vector-icons";

//images
import closeModal from "../../../assets/svg/close_modal";

const RecipeFeedSaveRecipe = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Save to</Text>
          <SvgXml
            xml={closeModal}
            onPress={() => props.setModalVisible(false)}
          />
        </View>
        <View style={{ padding: 10 }}>
          <TouchableOpacity style={styles.btnCategory}>
            <Text>Western</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCategory}>
            <Text>Quick lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCategory}>
            <Text>Vegies</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.btnCategory,
            {
              width: 165,
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 0,
              mar
            },
          ]}
        >
          <AntDesign name="plus" size={24} color={colors.white} />
          <Text style={{ color: colors.white, fontWeight: "700" }}>
            Add New Cookbook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: 285,
    height: 250,
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  btnCategory: {
    marginVertical: 10,
    backgroundColor: colors.green,
    paddingVertical: 5,
    borderRadius: 8,
    paddingLeft: 10,
  },
});

export default RecipeFeedSaveRecipe;
