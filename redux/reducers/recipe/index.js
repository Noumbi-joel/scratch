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
  RECIPES,
} from "../../constants";

const initialState = {
  recipes: [],
  isLoading: {
    nameImage: false,
    gallery: false,
    ingredients: false,
    rest: false,
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
      state.recipes[state.recipes.length - 1].recipeGalleryImages =
        action.payload;
      return state;

    case SAVE_RECIPE_INGREDIENTS:
      state.recipes[state.recipes.length - 1].recipeIngredients =
        action.payload;
      return state;

    case SAVE_RECIPE:
      lastRecipe.type = action.payload.type;
      lastRecipe.recipeHowToCook = action.payload.howToCook;
      lastRecipe.recipeAdditionals = action.payload.additionals;
      return state;

    default:
      return state;
  }
};

export default recipe;
