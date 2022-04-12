import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";

//modals
import EditRecipeGallery from "../EditRecipeGallery";
import EditRecipeAdditInfos from "../EditRecipeAdditInfos";
import EditRecipeHowToCook from "../EditRecipeHowToCook";
import EditRecipeIngredients from "../EditRecipeIngredients";

//picker
import { Picker } from "@react-native-picker/picker";

//colors
import colors from "../../../utils/colors";

//components
import Gallery from "../../../components/Gallery";
import List from "../../../components/List";
import Button from "../../../components/Button";

//images and svg
import { SvgXml } from "react-native-svg";
import raisin from "../../../assets/png/raisin.jpg";
import pen from "../../../assets/svg/pen";
import trash from "../../../assets/svg/trash";

const categoryContent = [
  { title: "Gallery", images: raisin },
  { title: "Ingredients", images: raisin },
  { title: "How to Cook" },
  { title: "Additional Info" },
];

const htk = [
  { title: "Heat a Belgian waffle iron." },
  {
    title:
      "Mix the flour, sugar, and baking powder together in a mixing bowl. Stir in 1 cup eggnog, butter, and the egg until well blended. Add more eggnog if needed to make a pourable batter.",
  },
  {
    title:
      "Lightly grease or spray the waffle iron with non-stick cooking spray. Pour some batter onto the preheated waffle iron,",
  },
];
const addInfosList = {
  servingTime: "12mins",
  nutritionFact: [
    "222 calories",
    "6.2 g fat",
    "7.2 g carbohydrates",
    "28.6 g protein",
    "68 mg cholesterol",
    "268 mg sodium",
  ],
  tags: ["Sweet", "Coconut", "Quick", "Easy", "Homemade"],
};

const EditRecipe = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [modalVisible, setModalVisible] = useState({
    galleryModal: false,
    ings: false,
    htk: false,
    addInfos: false,
  });

  const closeModal = (modalName) => {
    setModalVisible((state) => {
      return { ...state, [modalName]: false };
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.galleryModal}
      >
        <EditRecipeGallery
          colors={colors}
          raisin={raisin}
          closeModal={() => closeModal("galleryModal")}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.ings}
      >
        <EditRecipeIngredients
          colors={colors}
          closeModal={() => closeModal("ings")}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.htk}
      >
        <EditRecipeHowToCook
          colors={colors}
          closeModal={() => closeModal("htk")}
        />
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible.addInfos}
      >
        <EditRecipeAdditInfos
          colors={colors}
          closeModal={() => closeModal("addInfos")}
        />
      </Modal>
      
      <Text style={styles.screenTitle}>Edit Recipe</Text>
      <View style={styles.rowContainer}>
        <ImageBackground
          style={{ width: 62, height: 62 }}
          source={raisin}
          resizeMode="cover"
        />
        <View>
          <Text style={{ color: colors.grey_text, fontSize: 14 }}>
            Recipe Name
          </Text>
          <TextInput
            style={styles.inputStyle}
            value="Sautéed Orange & Mustard"
          />
        </View>
      </View>
      {categoryContent.map((cat, index) => (
        <View key={index} style={{ marginVertical: 10 }}>
          <View style={styles.rowHeaderContainer}>
            <Text
              style={[
                styles.screenTitle,
                { fontSize: 16, fontWeight: "700", marginTop: 10 },
              ]}
            >
              {cat.title}
            </Text>
            {cat.title === "Gallery" && (
              <TouchableOpacity
                onPress={() =>
                  setModalVisible({ ...modalVisible, galleryModal: true })
                }
              >
                <SvgXml xml={pen} />
              </TouchableOpacity>
            )}
            {cat.title === "Ingredients" && (
              <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, ings: true })}
              >
                <SvgXml xml={pen} />
              </TouchableOpacity>
            )}
            {cat.title === "How to Cook" && (
              <TouchableOpacity
                onPress={() => setModalVisible({ ...modalVisible, htk: true })}
              >
                <SvgXml xml={pen} />
              </TouchableOpacity>
            )}
            {cat.title === "Additional Info" && (
              <TouchableOpacity
                onPress={() =>
                  setModalVisible({ ...modalVisible, addInfos: true })
                }
              >
                <SvgXml xml={pen} />
              </TouchableOpacity>
            )}
          </View>
          {cat.title === "Gallery" && (
            <Gallery colors={colors} images={cat.images} />
          )}
          {cat.title === "Ingredients" && (
            <Gallery horizontal colors={colors} images={cat.images} />
          )}
          {cat.title === "How to Cook" && <List colors={colors} htk={htk} />}
          {cat.title === "Additional Info" && (
            <List colors={colors} addInfos addInfosList={addInfosList} />
          )}
        </View>
      ))}
      <Text style={{ color: "#606060" }}>Save to</Text>
      <View style={styles.rowContainer}>
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
        onPress={() => console.log("post nigga")}
        big
        btnName="Post to Feed"
      />
      <TouchableOpacity
        style={[styles.rowContainer, { justifyContent: "center" }]}
      >
        <SvgXml xml={trash} />
        <Text>Remove from Cookbook</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  inputStyle: {
    width: 245,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.btn,
  },
  screenTitle: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 24,
  },
  rowHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default EditRecipe;
