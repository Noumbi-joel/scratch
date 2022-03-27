import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

//images and icons
import raisin from "../../../assets/png/raisin.jpg";
import { AntDesign } from "@expo/vector-icons";

import Constants from "expo-constants";

//colors
import colors from "../../../utils/colors";
import Button from "../../../components/Button";

const ViewRecipe = (props) => {
  const [ingredients, setIngredients] = useState(true);
  const [howTk, setHtk] = useState(false);
  const [addInfos, setAddInfos] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ position: "relative" }}>
        <ImageBackground
          style={{ width: "100%", height: 250 }}
          resizeMode="cover"
          source={raisin}
        />
        <View
          style={{
            position: "absolute",
            top: Constants.statusBarHeight,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <AntDesign name="arrowleft" size={24} color={colors.white} />
            <Text style={{ marginLeft: 5, color: colors.white }}>
              Back to My Profile
            </Text>
          </View>

          <Button {...props} btnName="Cook Now" goto="CookingModeDisplay" />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          left: 10,
          top: 170,
          width: "80%",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "700", color: colors.white }}>
          Engine-Cooked Honey Orange Pancake
        </Text>
      </View>

      <View
        style={{
          marginVertical: 20,
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={raisin}
          style={{ width: 100, height: 100, marginHorizontal: 5 }}
        />
        <Image
          source={raisin}
          style={{ width: 100, height: 100, marginHorizontal: 5 }}
        />
        <View
          style={{
            position: "relative",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: colors.black,
              position: "absolute",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 99,
              width: "100%",
              height: "100%",
              paddingTop: 40,
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            12+
          </Text>
          <Image
            source={raisin}
            style={{ width: 100, height: 100, marginHorizontal: 5 }}
          />
        </View>
      </View>
      <ScrollView
        horizontal
        style={{
          alignSelf: "center",
          height: 50
        }}
      >
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={() => {
            setIngredients(true);
            setHtk(false);
            setAddInfos(false);
          }}
        >
          <Text
            style={
              ingredients
                ? {
                    borderBottomWidth: 3,
                    borderColor: colors.green,
                    color: colors.black,
                    fontSize: 16,
                  }
                : { color: colors.black, fontSize: 16 }
            }
          >
            Ingredients
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={() => {
            setIngredients(false);
            setHtk(true);
            setAddInfos(false);
          }}
        >
          <Text
            style={
              howTk
                ? {
                    borderBottomWidth: 3,
                    borderColor: colors.green,
                    color: colors.black,
                    fontSize: 16,
                  }
                : { color: colors.black, fontSize: 16 }
            }
          >
            How to Cook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={() => {
            setIngredients(false);
            setHtk(false);
            setAddInfos(true);
          }}
        >
          <Text
            style={
              addInfos
                ? {
                    borderBottomWidth: 3,
                    borderColor: colors.green,
                    color: colors.black,
                    fontSize: 16,
                  }
                : { color: colors.black, fontSize: 16 }
            }
          >
            Additional Infos
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {ingredients && (
        <ScrollView>
          <View style={{flexDirection: 'row', alignItems: "center"}}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginVertical: 5,
                marginLeft: 15,
              }}
              source={raisin}
            />
            <Text style={{paddingLeft: 15}}>cooking spray</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: "center"}}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginVertical: 5,
                marginLeft: 15,
              }}
              source={raisin}
            />
            <Text style={{paddingLeft: 15}}>1/2 cup whole milk</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: "center"}}>
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginVertical: 5,
                marginLeft: 15,
              }}
              source={raisin}
            />
            <Text style={{paddingLeft: 15}}>2 large eggs1 tablespoon maple syrups</Text>
          </View>

        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ViewRecipe;
