import { combineReducers } from "redux";
import { characterReducer } from "./characterReducer";
import { favoriteReducer } from "./favoriteReducer";

export default combineReducers({
  characters: characterReducer,
  favorites: favoriteReducer,
});
