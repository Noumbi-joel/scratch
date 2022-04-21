import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";

//colors
import colors from "../../utils/colors";

//picker
import { Picker } from "@react-native-picker/picker";

//components
import UploadBtn from "../../components/UploadBtn";
import Button from "../../components/Button";
import NewRecipeModal from "../../components/NewRecipeModal";

//svg
import { SvgXml } from "react-native-svg";
import pen from "../../assets/svg/decolored_pen";

//image picker
import * as ImagePicker from "expo-image-picker";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  saveNameImage,
  saveGallery,
  saveIngredients,
  saveRecipe,
} from "../../redux/actions/recipe";

const categoryContent = [
  {
    title: "Gallery",
    btnTitle: "Upload Images or Open Camera",
    part: "partTwo",
  },
  { title: "Ingredients", btnTitle: "Add Ingredient", part: "partThree" },
  { title: "How to Cook", btnTitle: "Add Directions", part: "partFour" },
  { title: "Additional Info", btnTitle: "Add Info", part: "partFive" },
];

const NewRecipe = (props) => {
  const dispatch = useDispatch();
  const { nameImage, gallery, ingredients, rest } = useSelector(
    (state) => state.recipe.isLoading
  );

  const [partOne, setPartOne] = useState({
    name: "",
    image: "",
  });

  const [recipe, setRecipe] = useState({
    partTwo: {
      value: [],
      modalVisible: false,
    },
    partThree: {
      value: [],
      modalVisible: false,
    },
    partFour: {
      value: [],
      additionals: [],
      type: "",
      modalVisible: false,
    },
    partFive: {
      modalVisible: false,
      value: [],
    },
  });

  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      if (type === "partTwo") {
        saveGalleryPick(result.uri);
        /* return dispatch(saveGallery(recipe.partFive.value)); */
      } else if (type === "partThree") {
      } else {
        setPartOne({ ...partOne, image: result.uri });
        return dispatch(
          saveNameImage({ name: partOne.name, image: result.uri })
        );
      }
    }
  };

  const saveGalleryPick = (val) => {
    const copy = [...recipe.partTwo.value];
    copy.push(val);
    setRecipe({
      ...recipe,
      partTwo: { ...recipe.partTwo, value: copy },
    });
  };

  const [selectedLanguage, setSelectedLanguage] = useState();

  const handleModal = (part) => {
    if (part === "partTwo") {
      return setRecipe({
        ...recipe,
        partTwo: {
          ...recipe.partTwo,
          modalVisible: !recipe.partTwo.modalVisible,
        },
      });
    } else if (part === "partThree") {
      return setRecipe({
        ...recipe,
        partThree: {
          ...recipe.partThree,
          modalVisible: !recipe.partTwo.modalVisible,
        },
      });
    } else {
      return setRecipe({
        ...recipe,
        partFour: {
          ...recipe.partFour,
          modalVisible: !recipe.partFour.modalVisible,
        },
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Modal
        visible={recipe.partTwo.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal
          gallery
          closeModal={() => handleModal("partTwo")}
          pickImage={() => pickImage("partTwo")}
          saveData={() => dispatch(saveGallery(recipe.partTwo.value))}
        />
      </Modal>

      <Modal
        visible={recipe.partThree.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal
          ingredients
          closeModal={() => handleModal("partThree")}
        />
      </Modal>

      <Modal
        visible={recipe.partThree.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal
          ingredients
          closeModal={() => handleModal("partThree")}
        />
      </Modal>

      <Modal
        visible={recipe.partFour.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal htk closeModal={() => handleModal("partFour")} />
      </Modal>

      <Modal
        visible={recipe.partFive.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal
          additionals
          closeModal={() => handleModal("partFive")}
        />
      </Modal>
      <View style={styles.body}>
        <Text style={styles.screenTitle}>New Recipe</Text>
        {!nameImage && (
          <View style={styles.rowContainer}>
            <UploadBtn small pickImage={pickImage} image={partOne.image} />
            <View>
              <Text style={{ color: colors.grey_text, fontSize: 14 }}>
                Recipe Name
              </Text>
              <TextInput
                style={styles.inputStyle}
                placeholder="Write Down Recipe Name"
                value={partOne.name}
                onChangeText={(val) => setPartOne({ ...partOne, name: val })}
              />
            </View>
          </View>
        )}
        {nameImage && (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.green} />
          </View>
        )}
        {categoryContent.map((cat, index) => (
          <View key={index}>
            <View style={styles.rowHeaderContainer}>
              <Text
                style={[
                  styles.screenTitle,
                  { fontSize: 16, fontWeight: "700", marginTop: 10 },
                ]}
              >
                {cat.title === "Gallery" &&
                  `${cat.title}(${recipe.partTwo.value.length})`}
                {cat.title === "Ingredients" &&
                  `${cat.title}(${recipe.partThree.value.length})`}
                {cat.title === "How to Cook" &&
                  `${cat.title}(${recipe.partFour.value.length})`}
                {cat.title === "Additional Info" &&
                  `${cat.title}(${recipe.partFour.additionals.length})`}
              </Text>
              <TouchableOpacity>
                <SvgXml xml={pen} />
              </TouchableOpacity>
            </View>
            <UploadBtn
              launchModal={() => handleModal(cat.part)}
              title={cat.btnTitle}
            />
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
  centered: {
    alignItems: "center",
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
