import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

//colors
import colors from "../../utils/colors";

//picker
import { Picker } from "@react-native-picker/picker";

//components
import UploadBtn from "../../components/UploadBtn";
import Button from "../../components/Button";

//svg
import { SvgXml } from "react-native-svg";
import pen from "../../assets/svg/decolored_pen";

const categoryContent = [
  { title: "Gallery", btnTitle: "Upload Images or Open Camera" },
  { title: "Ingredients", btnTitle: "Add Ingredient" },
  { title: "How to Cook", btnTitle: "Add Directions" },
  { title: "Additional Info", btnTitle: "Add Info" },
];

const NewRecipe = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.screenTitle}>New Recipe</Text>
        <View style={styles.rowContainer}>
          <UploadBtn small />
          <View>
            <Text style={{ color: colors.grey_text, fontSize: 14 }}>
              Recipe Name
            </Text>
            <TextInput
              style={styles.inputStyle}
              placeholder="Write Down Recipe Name"
            />
          </View>
        </View>
        {categoryContent.map((cat, index) => (
          <View key={index}>
            <View style={styles.rowHeaderContainer}>
              <Text
                style={[
                  styles.screenTitle,
                  { fontSize: 16, fontWeight: "700", marginTop: 10 },
                ]}
              >
                {cat.title}
              </Text>
              <TouchableOpacity>
                <SvgXml xml={pen} />
              </TouchableOpacity>
            </View>
            <UploadBtn title={cat.btnTitle} />
          </View>
        ))}
        <Text style={{ color: "#606060" }}>Save to</Text>
        <View style={styles.rowHeaderContainer}>
          <Picker
            style={{ width: 150 }}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="Western(5)" value="western" />
            <Picker.Item label="Lunch(0)" value="lunch" />
          </Picker>
          <Button widthIncrease saveRecipe btnName="Save Recipe" />
        </View>
        <Button
          color={colors.btn}
          onPress={() => console.log("post nigga")}
          big
          btnName="Post to Feed"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
  },
  rowHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 22,
    color: colors.black,
  },
  inputStyle: {
    width: 245,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.btn,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default NewRecipe;
