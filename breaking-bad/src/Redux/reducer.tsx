import { CharacterData } from "../Pages/Home";
import { typeActions } from "./actions";

interface stateType {
  favArr: CharacterData[];
  characterArr: CharacterData[];
}

const initialState: stateType = {
  favArr: [],
  characterArr: [],
};

export const reducer = (
  state: stateType = initialState,
  action: { type: string; payload: CharacterData[] }
) => {
  if (action.type === typeActions.FAV_ARR) {
    const newState: stateType = { ...state, favArr: [...action.payload] };
    return newState;
  } else if (action.type === typeActions.CHARACTER_ARR) {
    const newState: stateType = { ...state, characterArr: [...action.payload] };
    return newState;
  }
  return state;
};
