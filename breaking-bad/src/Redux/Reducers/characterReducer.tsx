import { CharacterData } from "../../Pages/Home";
import { typeActions } from "../actions";

interface stateType {
  characterArr: CharacterData[];
}

const initialState: stateType = {
  characterArr: [],
};

export const characterReducer = (
  state: stateType = initialState,
  action: { type: string; payload: CharacterData[] }
) => {
  switch (action.type) {
    case typeActions.CHARACTER_ARR:
      const charNewState: stateType = {
        ...state,
        characterArr: [...action.payload],
      };
      return charNewState;
    default:
      return state;
  }
};
