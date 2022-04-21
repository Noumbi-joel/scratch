import { combineReducers } from "redux";
import user from "./user";
import recipe from "./recipe";

const reducers = combineReducers({
  user,
  recipe
});

export default reducers;
