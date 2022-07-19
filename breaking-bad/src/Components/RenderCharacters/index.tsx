import { FC } from "react";
import { CharacterData } from "../../Pages/Home";

import { ReactComponent as HeartSvg } from "../../Assets/Images/HEART.svg";
import { ReactComponent as HeartFilledSvg } from "../../Assets/Images/HEART_FILLED.svg";

import { NavigateFunction } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import styles from "../../Pages/Home/home.module.css";
import { typeActions } from "../../Redux/actions";

interface CharactersProps {
  characterData: CharacterData[] | undefined;
  history: NavigateFunction;
}

const RenderCharacters: FC<CharactersProps> = ({ characterData, history }) => {
  const favArr = useSelector((rootState: RootState) => rootState.favArr);
  const dispatch = useDispatch();
  return (
    <>
      {characterData?.map((character, index) => {
        const favorite = favArr.find(
          (element) => element.char_id === character.char_id
        );
        return (
          <div
            className={styles.item}
            key={index.toString()}
            onClick={() => {
              const filterCharacter = characterData.filter(
                (item) => item.char_id !== character.char_id
              );
              history("/character", {
                state: {
                  charData: character,
                  otherCharacters: filterCharacter,
                },
              });
            }}
          >
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
                let tempFavArr = [...favArr];
                if (favorite) {
                  tempFavArr = tempFavArr.filter((item: CharacterData) => {
                    return item.char_id !== character.char_id;
                  });
                } else {
                  tempFavArr.push(character);
                }
                dispatch({ type: typeActions.FAV_ARR, payload: tempFavArr });
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
      })}
    </>
  );
};

export default RenderCharacters;
