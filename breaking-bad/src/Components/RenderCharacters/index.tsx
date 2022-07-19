import { FC } from "react";
import { CharacterData } from "../../Pages/Home";

import { useSelector } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { RootState } from "../../Redux/store";
import Characters from "../Characters";

interface CharactersProps {
  characterData: CharacterData[] | undefined;
  history: NavigateFunction;
}

const RenderCharacters: FC<CharactersProps> = ({ characterData, history }) => {
  const favArr = useSelector((rootState: RootState) => rootState.favArr);
  return (
    <>
      {characterData?.map((character, index) => {
        const favorite = favArr.find(
          (element) => element.char_id === character.char_id
        );
        return (
          <Characters
            index={index}
            history={history}
            character={character}
            characterData={characterData}
            favorite={favorite}
            favArr={favArr}
          />
        );
      })}
    </>
  );
};

export default RenderCharacters;
