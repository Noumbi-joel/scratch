import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions
} from "react-native";

import raisin from "../../../assets/png/raisin.jpg";

//components
import ProfileHeader from "../../../components/ProfileHeader";
import colors from "../../../utils/colors";

const OtherUserProfile = (props) => {
  const [recipes, setRecipes] = useState(true);
  const [following, setFollowing] = useState(false);
  return (
    <View style={styles.container}>
      <ProfileHeader noIcon {...props} />
      <View style={styles.accountDetails}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setRecipes(true);
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
            <TouchableOpacity
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
            </TouchableOpacity>

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

export default OtherUserProfile;
