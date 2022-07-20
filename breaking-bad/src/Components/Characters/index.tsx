import { FC } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction } from "react-router-dom";
import { CharacterData } from "../../Pages/Home";

import { ReactComponent as HeartSvg } from "../../Assets/Images/HEART.svg";
import { ReactComponent as HeartFilledSvg } from "../../Assets/Images/HEART_FILLED.svg";
import { typeActions } from "../../Redux/actions";
import styles from "../Characters/characters.module.css";

interface CharacterProps {
  index: number;
  history: NavigateFunction;
  character: CharacterData;
  characterData: CharacterData[];
  favorite: CharacterData | undefined;
  favArr: CharacterData[];
}

const Characters: FC<CharacterProps> = ({
  index,
  history,
  character,
  characterData,
  favorite,
  favArr,
}) => {
  const dispatch = useDispatch();
  const onItemClick = () => {
    const filterCharacter = characterData.filter(
      (item) => item.char_id !== character.char_id
    );
    history("/character", {
      state: {
        charData: character,
        otherCharacters: filterCharacter,
      },
    });
  };

  return (
    <div className={styles.item} key={index.toString()} onClick={onItemClick}>
      <img
        src={character.img}
        className={styles.characterImg}
        alt="CharacterImages"
      />
      <div className={styles.dataView}>
        <p className={styles.charName}>{character.name}</p>
        <p className={styles.charNickname}>{character.nickname}</p>
        <div className={styles.portrayedView}>
          <p className={styles.portrayedKey}>Portrayed</p>
          <p className={styles.portrayedValue}>{character.portrayed}</p>
        </div>
      </div>
      <div
        className={styles.likeView}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({
            type: typeActions.FAV_ARR,
            payload: { favorite: favorite, character: character },
          });
        }}
      >
        {favorite ? (
          <HeartFilledSvg width={35} height={40} />
        ) : (
          <HeartSvg width={35} height={40} />
        )}
      </div>
    </div>
  );
};

export default Characters;
