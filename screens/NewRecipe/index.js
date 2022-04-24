import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  Platform
} from "react-native";

//colors
import colors from "../../utils/colors";

//picker
import { Picker } from "@react-native-picker/picker";

//components
import UploadBtn from "../../components/UploadBtn";
import Button from "../../components/Button";
import NewRecipeModal from "../../components/NewRecipeModal";

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
      text: "",
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
      } else if (type === "partThree") {
        saveIngredientsPick(result.uri);
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

  const saveIngredientsPick = (val) => {
    const copy = [...recipe.partThree.value];
    copy.push({ image: val, name: recipe.partThree.text });
    setRecipe({
      ...recipe,
      partThree: { ...recipe.partThree, value: copy, text: "" },
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
          modalVisible: !recipe.partThree.modalVisible,
        },
      });
    } else if (part === "partFour") {
      return setRecipe({
        ...recipe,
        partFour: {
          ...recipe.partFour,
          modalVisible: !recipe.partFour.modalVisible,
        },
      });
    } else {
      return setRecipe({
        ...recipe,
        partFive: {
          ...recipe.partFive,
          modalVisible: !recipe.partFive.modalVisible,
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
            console.log(recipe.partTwo.value);
            return dispatch(saveGallery(recipe.partTwo.value, partOne.name));
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
            if (recipe.partThree.value.length == 0) {
              return Alert.alert(
                "YOUR CURRENT INGREDIENTS ARE EMPTY!",
                "Please set at least one ingredient in the list"
              );
            }
            console.log(recipe.partThree.value);
            setRecipe({
              ...recipe,
              partThree: { ...recipe.partThree, modalVisible: false },
            });
            return dispatch(saveIngredients(recipe.partThree.value, partOne.name));
          }}
        />
      </Modal>

      <Modal
        visible={recipe.partFour.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal
          ingredients
          htk
          closeModal={() => {
            handleModal("partFour");
            console.log(recipe.partFour.value);
          }}
          value={recipe.partFour.text}
          handleChange={(val) =>
            setRecipe({
              ...recipe,
              partFour: { ...recipe.partFour, text: val },
            })
          }
          saveData={() => {
            setRecipe({
              ...recipe,
              partFour: {
                ...recipe.partFour,
                value: [...recipe.partFour.value, recipe.partFour.text],
                text: "",
              },
            });
          }}
        />
      </Modal>

      <Modal
        visible={recipe.partFive.modalVisible}
        animationType="slide"
        transparent={true}
      >
        <NewRecipeModal
          closeModal={() => {
            handleModal("partFive");
            console.log(recipe.partFive.value);
          }}
          onSave={(values) => {
            console.log(recipe.partFive.value);
            const copy = [...recipe.partFive.value];
            copy.push(values.servingTime);
            copy.push(values.nutritions);
            copy.push(values.tags);
            setRecipe({
              ...recipe,
              partFive: {
                ...recipe.partFive,
                value: copy,
                modalVisible: false,
              },
            });
          }}
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
            launchModal={() => handleModal("partFour")}
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
          {`Additional Info(${recipe.partFive.value.length})`}
        </Text>
        {!rest && (
          <UploadBtn
            launchModal={() => handleModal("partFive")}
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
            <Picker.Item label="Western" value="western" />
            <Picker.Item label="Lunch" value="lunch" />
          </Picker>
        )}
        {rest && <LoadingOverlay colors={colors} newRecipe />}
        <Button
          widthIncrease
          saveRecipe
          btnName="Save Recipe"
          onPress={() => {
            dispatch(
              saveRecipe(
                selectedLanguage,
                recipe.partFour.value,
                recipe.partFive.value,
                partOne.name
              )
            );
          }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Button
          color={colors.btn}
          onPress={() => props.navigation.popToTop()}
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
