import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

//utils
import raisin from "../../../assets/png/raisin.jpg";
import colors from "../../../utils/colors";

//components
import ProfileHeader from "../../../components/ProfileHeader";
import LoadingOverlay from "../../../components/LoadingOverlay";
import ProfileGroupData from "../../../components/ProfileGroupData";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/actions/user";

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.user.currentUser.value);
  const isLoading = useSelector((state) => state.user.currentUser.isLoading);

  const [recipes, setRecipes] = useState(true);
  const [saved, setSaved] = useState(false);
  const [following, setFollowing] = useState(false);

  console.log(profileData);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingOverlay colors={colors} />;
  }

  return (
    <View style={styles.container}>
      <ProfileHeader profileData={profileData} {...props} />
      <View style={styles.accountDetails}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setRecipes(true);
            setSaved(false);
            setFollowing(false);
          }}
        >
          <Text style={styles.accountTextDetails}>
            {profileData?.recipes.length}
          </Text>
          <Text style={recipes ? styles.textTrue : styles.textFalse}>
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
          <Text style={styles.accountTextDetails}>
            {profileData?.savedRecipes.length}
          </Text>
          <Text style={saved ? styles.textTrue : styles.textFalse}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            setRecipes(false);
            setSaved(false);
            setFollowing(true);
          }}
        >
          <Text style={styles.accountTextDetails}>
            {profileData?.followingProfiles.length}
          </Text>
          <Text style={following ? styles.textTrue : styles.textFalse}>
            Following
          </Text>
        </TouchableOpacity>
      </View>
      <ProfileGroupData
        recipes={recipes}
        saved={saved}
        following={following}
        raisin={raisin}
        colors={colors}
        profileData={profileData}
      />
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
  textTrue: {
    borderBottomWidth: 3,
    borderColor: colors.green,
    color: colors.black,
    fontSize: 16,
  },
  textFalse: { color: colors.black, fontSize: 16 },
});

export default UserProfile;
