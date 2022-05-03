import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

//components
import Recipe from "../../../components/Recipe";
import LoadingOverlay from "../../../components/LoadingOverlay";

//colors
import colors from "../../../utils/colors";

//redux
import { fetchRecipes } from "../../../redux/actions/recipe";
import { useSelector, useDispatch } from "react-redux";

const RecipeFeedDisplay = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.recipe.isLoading.recipeFeed);
  const recipes = useSelector((state) => state.recipe.recipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingOverlay colors={colors} />;
  }

  return (
    <View style={!recipes.length ? styles.centered : styles.container}>
      {!recipes.length && (
        <Text>No recipes available, you can push your own now 😅</Text>
      )}
      <FlatList
        data={recipes}
        horizontal
        renderItem={({ item, index }) => (
          <Recipe {...props} recipe={item} key={index} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecipeFeedDisplay;
