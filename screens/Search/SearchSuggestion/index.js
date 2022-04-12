import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import Constants from "expo-constants";

//components
import SearchBar from "../../../components/SearchBar";
import RecipeBox from "../../../components/RecipeBox";
import FilterCard from "../../../components/FilterCard";

//colors
import colors from "../../../utils/colors";

//images
import raisin from "../../../assets/png/raisin.jpg";

const SearchSuggestion = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <FilterCard setModalVisible={setModalVisible} />
      </Modal>
      <SearchBar setModalVisible={setModalVisible} {...props} />
      <Text style={styles.categoryTitle}>Trending Recipes</Text>
      <ScrollView
        horizontal
        style={{ margin: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        <RecipeBox img={raisin} />
        <RecipeBox img={raisin} />
        <RecipeBox img={raisin} />
        <RecipeBox img={raisin} />
      </ScrollView>

      <Text style={styles.categoryTitle}>What can I make this..</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity>
          <Text style={styles.cookMoment}>Morning</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.cookMoment}>Dinner</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.cookMoment}>Tonight</Text>
        </TouchableOpacity>
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ margin: 10 }}
      >
        <RecipeBox img={raisin} />
        <RecipeBox img={raisin} />
        <RecipeBox img={raisin} />
        <RecipeBox img={raisin} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  cookMoment: {
    fontSize: 16,
    color: colors.black,
    fontWeight: "500",
    width: 100,
    height: 25,
    marginLeft: 10,
  },
  categoryTitle: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "700",
    marginTop: 20,
    marginLeft: 10,
  },
});

export default SearchSuggestion;
