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
  Alert,
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
import LoadingOverlay from "../../components/LoadingOverlay";

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
      text: "",
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

  /*  const saveGallery = () => {
    if (recipe.partTwo.value.length == 0) {
      return Alert.alert(
        "YOUR CURRENT GALLERY IS EMPTY!",
        "Please set at least one image in the gallery"
      );
    }
    return dispatch(saveGallery(recipe.partTwo.value));
  }; */

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
          saveData={() => {
            if (recipe.partTwo.value.length == 0) {
              return Alert.alert(
                "YOUR CURRENT GALLERY ARE EMPTY!",
                "Please set at least one image in the list"
              );
            }
            setRecipe({
              ...recipe,
              partTwo: { ...recipe.partTwo, modalVisible: false },
            });
            return dispatch(saveGallery(recipe.partTwo.value));
          }}
        />
      </Modal>

      <Modal
        visible={recipe.partThree.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal
          ingredients
          pickImage={() => pickImage("partThree")}
          closeModal={() => handleModal("partThree")}
          value={recipe.partThree.text}
          handleChange={(val) =>
            setRecipe({
              ...recipe,
              partThree: { ...recipe.partThree, text: val },
            })
          }
          saveData={() => {
            /* if (recipe.partThree.value.length == 0) {
              return Alert.alert(
                "YOUR CURRENT INGREDIENTS ARE EMPTY!",
                "Please set at least one ingredient in the list"
              );
            } */
            console.log(recipe.partThree.text)
            /* setRecipe({
              ...recipe,
              partThree: { ...recipe.partThree, modalVisible: false },
            });
            return dispatch(saveIngredients(recipe.partThree.value)); */
          }}
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
        {nameImage && <LoadingOverlay colors={colors} newRecipe />}

        <Text
          style={[
            styles.screenTitle,
            { fontSize: 16, fontWeight: "700", marginTop: 10 },
          ]}
        >
          {`Gallery(${recipe.partTwo.value.length})`}
        </Text>
        {!gallery && (
          <UploadBtn
            launchModal={() => handleModal("partTwo")}
            title="Upload Images"
          />
        )}
        {gallery && <LoadingOverlay colors={colors} newRecipe />}

        <Text
          style={[
            styles.screenTitle,
            { fontSize: 16, fontWeight: "700", marginTop: 10 },
          ]}
        >
          {`Ingredients(${recipe.partThree.value.length})`}
        </Text>
        {!ingredients && (
          <UploadBtn
            launchModal={() => handleModal("partThree")}
            title="Add Ingredient"
          />
        )}
        {ingredients && <LoadingOverlay colors={colors} newRecipe />}

        <Text
          style={[
            styles.screenTitle,
            { fontSize: 16, fontWeight: "700", marginTop: 10 },
          ]}
        >
          {`How To Cook(${recipe.partFour.value.length})`}
        </Text>
        {!rest && (
          <UploadBtn
            launchModal={() => handleModal("partTwo")}
            title="Add Direction"
          />
        )}
        {rest && <LoadingOverlay colors={colors} newRecipe />}

        <Text
          style={[
            styles.screenTitle,
            { fontSize: 16, fontWeight: "700", marginTop: 10 },
          ]}
        >
          {`Additional Info(${recipe.partFour.additionals.length})`}
        </Text>
        {!rest && (
          <UploadBtn
            launchModal={() => handleModal("partTwo")}
            title="Add Additional"
          />
        )}
        {rest && <LoadingOverlay colors={colors} newRecipe />}
      </View>

      <Text style={{ color: "#606060", marginLeft: 20 }}>Save to</Text>
      <View style={styles.rowHeaderContainer}>
        {!rest && (
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
        )}
        {rest && <LoadingOverlay colors={colors} newRecipe />}
        <Button widthIncrease saveRecipe btnName="Save Recipe" />
      </View>
      <View style={{ alignItems: "center" }}>
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
    marginHorizontal: 20,
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
