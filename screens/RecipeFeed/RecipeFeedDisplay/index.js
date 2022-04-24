import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

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
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recipes.length < 0 && (
          <Text style={{ textAlign: "center" }}>
            No recipes available, you can push your own now 😅
          </Text>
        )}
        {recipes.map((recipe, index) => (
          <Recipe {...props} recipe={recipe} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RecipeFeedDisplay;
