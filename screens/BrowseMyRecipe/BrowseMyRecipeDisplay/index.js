import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

//icons and images
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

//components
import MyClassifiedRecipe from "../../../components/MyClassifiedRecipe";

//colors
import colors from "../../../utils/colors";

const BrowseMyRecipe = (props) => {
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            lineHeight: 32,
            color: colors.black,
            fontWeight: "700",
          }}
        >
          My Recipes
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign name="plus" size={24} color={colors.green} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 16,
              fontWeight: "700",
              color: colors.green,
            }}
          >
            Add New
          </Text>
        </TouchableOpacity>
      </View>
      {/*       <MaterialIcons name="keyboard-arrow-up" size={30} color="black" />*/}
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "400", color: colors.black }}>
          Western (recipe number)
        </Text>
      </View>
      <MyClassifiedRecipe {...props} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BrowseMyRecipe;
