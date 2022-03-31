import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

//svg
import { SvgXml } from "react-native-svg";
import search from "../../assets/svg/search";
import sorting from "../../assets/svg/sorting_icon";
import colors from "../../utils/colors";

const SearchBar = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <SvgXml xml={search} />
        </View>
        <TextInput
          style={styles.searchbar}
          placeholder="Search recipes, people or tag"
        />
        <TouchableOpacity
          style={styles.iconContainerSec}
          onPress={() => props.setModalVisible(true)}
        >
          <SvgXml xml={sorting} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    width: 350,
    alignSelf: "center",
    shadowOpacity: 0.1,
    shadowColor: colors.green,
    borderRadius: 10,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    elevation: 2,
    shadowRadius: 2,
  },
  searchbar: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderWidth: 0,
    paddingHorizontal: 10,
  },
  iconContainer: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  iconContainerSec: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default SearchBar;
