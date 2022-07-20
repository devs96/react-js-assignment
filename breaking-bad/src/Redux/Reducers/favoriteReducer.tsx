import { CharacterData } from "../../Pages/Home";
import { typeActions } from "../actions";

interface stateType {
  favArr: CharacterData[];
}

interface payloadType {
  character: CharacterData;
  favorite: CharacterData | undefined;
}

const initialState: stateType = {
  favArr: [],
};

export const favoriteReducer = (
  state: stateType = initialState,
  action: { type: string; payload: payloadType }
) => {
  switch (action.type) {
    case typeActions.FAV_ARR:
      if (action.payload.favorite) {
        state.favArr = state.favArr.filter((item: CharacterData) => {
          return item.char_id !== action.payload.character.char_id;
        });
      } else {
        state.favArr.push(action.payload.character);
      }
      const favNewState: stateType = { ...state, favArr: [...state.favArr] };
      return favNewState;
    default:
      return state;
  }
};
