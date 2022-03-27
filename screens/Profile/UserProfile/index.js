import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";

import raisin from "../../../assets/png/raisin.jpg";

//components
import ProfileHeader from "../../../components/ProfileHeader";
import colors from "../../../utils/colors";

const UserProfile = (props) => {
  const [recipes, setRecipes] = useState(true);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);
  return (
    <View style={styles.container}>
      <ProfileHeader />
      <View style={styles.accountDetails}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setRecipes(true);
            setSaved(false);
            setFollowing(false);
          }}
        >
          <Text style={styles.accountTextDetails}>20</Text>
          <Text
            style={
              recipes
                ? {
                    borderBottomWidth: 3,
                    borderColor: colors.green,
                    color: colors.black,
                    fontSize: 16,
                  }
                : { color: colors.black, fontSize: 16 }
            }
          >
            Recipes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setRecipes(false);
            setSaved(true);
            setFollowing(false);
          }}
        >
          <Text style={styles.accountTextDetails}>75</Text>
          <Text
            style={
              saved
                ? {
                    borderBottomWidth: 3,
                    borderColor: colors.green,
                    color: colors.black,
                    fontSize: 16,
                  }
                : { color: colors.black, fontSize: 16 }
            }
          >
            Saved
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setRecipes(false);
            setSaved(false);
            setFollowing(true);
          }}
        >
          <Text style={styles.accountTextDetails}>248</Text>
          <Text
            style={
              following
                ? {
                    borderBottomWidth: 3,
                    borderColor: colors.green,
                    color: colors.black,
                    fontSize: 16,
                  }
                : { color: colors.black, fontSize: 16 }
            }
          >
            Following
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {recipes && (
          <>
            <View
              style={{
                width: 150,
                height: 132,
                margin: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "red",
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={{ width: "100%", height: 90 }}
                source={raisin}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Italian
              </Text>
            </View>

            <View
              style={{
                width: 150,
                height: 132,
                margin: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "red",
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={{ width: "100%", height: 90 }}
                source={raisin}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Italian
              </Text>
            </View>

            <View
              style={{
                width: 150,
                height: 132,
                margin: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "red",
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={{ width: "100%", height: 90 }}
                source={raisin}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Italian
              </Text>
            </View>

            <View
              style={{
                width: 150,
                height: 132,
                margin: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "red",
              }}
            >
              <ImageBackground
                resizeMode="cover"
                style={{ width: "100%", height: 90 }}
                source={raisin}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 16,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                Italian
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountDetails: {
    width: 325,
    marginTop: 20,
    height: 70,
    alignSelf: "center",
    flexDirection: "row",
    /* backgroundColor: 'red', */
    borderBottomWidth: 1,
    borderBottomColor: "#979797",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  accountTextDetails: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  borderBtm: { borderBottomWidth: 3, borderColor: colors.green },
});

export default UserProfile;
