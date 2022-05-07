//constants
import {
  FETCH_RECIPE,
  SAVE_RECIPE,
  SAVE_RECIPE_GALLERY,
  SAVE_RECIPE_IMAGE_NAME,
  SAVE_NAME_IMAGE_LOADING,
  SAVE_GALLERY_LOADING,
  SAVE_INGREDIENTS_LOADING,
  SAVE_REST_LOADING,
  SAVE_RECIPE_INGREDIENTS,
  UPDATE_RECIPE,
  FETCH_ALL_RECIPES,
  FETCH_ALL_RECIPES_LOADING,
  LIKE_RECIPE,
  IS_SAVED_EMAIL,
  SAVED_RECIPE,
} from "../../constants";

const initialState = {
  savedRecipes: [],
  recipes: [],
  isLoading: {
    nameImage: false,
    gallery: false,
    ingredients: false,
    rest: false,
    recipeFeed: false,
  },
};

const recipe = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_NAME_IMAGE_LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, nameImage: action.payload },
      };
    case SAVE_GALLERY_LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, gallery: action.payload },
      };
    case SAVE_INGREDIENTS_LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, ingredients: action.payload },
      };
    case SAVE_REST_LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, rest: action.payload },
      };
    case SAVE_RECIPE_IMAGE_NAME:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case SAVE_RECIPE_GALLERY:
      state.recipes[state.recipes.length - 1].recipeGalleryImages.push(
        action.payload
      );
      return state;

    case SAVE_RECIPE_INGREDIENTS:
      state.recipes[state.recipes.length - 1].recipeIngredients.push(
        action.payload
      );
      return state;

    case SAVE_RECIPE:
      state.recipes[state.recipes.length - 1].type = action.payload.type;
      state.recipes[state.recipes.length - 1].recipeHowToCook =
        action.payload.howToCook;
      state.recipes[state.recipes.length - 1].recipeAdditionals =
        action.payload.additionals;
      return state;

    case FETCH_ALL_RECIPES:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case FETCH_ALL_RECIPES_LOADING:
      return {
        ...state,
        isLoading: { ...state.isLoading, recipeFeed: action.payload },
      };

    case LIKE_RECIPE:
      const concernedRecipe = state.recipes.find(
        (recipe) => recipe.recipeName === action.payload.recipeName
      );

      if (action.payload.currentStatus) {
        concernedRecipe.nbLike.push(action.payload.likerEmail);
      } else {
        const index = concernedRecipe.nbLike.indexOf(action.payload.likerEmail);
        if (index > -1) {
          concernedRecipe.nbLike.splice(index, 1);
        }
      }

      return {
        ...state,
        recipes: [...state.recipes, concernedRecipe],
      };

    case IS_SAVED_EMAIL:
      const recipeItem = state.recipes.find(
        (recipe) => recipe.recipeName === action.payload.recipeName
      );

      if (action.payload.currentStatus) {
        recipeItem.isSaved.push(action.payload.email);
      } else {
        const index = recipeItem.isSaved.indexOf(action.payload.email);
        if (index > -1) {
          recipeItem.isSaved.splice(index, 1);
        }
      }

      return {
        ...state,
        recipes: [...state.recipes, recipeItem],
      };

    case SAVED_RECIPE:
      const savedRecipeCopy = [...state.savedRecipes];

      if (action.payload.currentStatus) {
        savedRecipeCopy.push(action.payload.recipeObj);
      } else {
        const res = savedRecipeCopy.filter(
          (recipe) =>
            recipe.recipeName !== action.payload.recipeObj.recipeName
        )
        savedRecipeCopy.concat(res);
      }
      return {
        ...state,
        savedRecipes: savedRecipeCopy
      };

    default:
      return state;
  }
};

export default recipe;
