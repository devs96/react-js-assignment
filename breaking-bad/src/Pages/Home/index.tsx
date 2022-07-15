import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import RenderCharacters from "../../Components/RenderCharacters";
import styles from "./home.module.css";

import { useSelector } from "react-redux";
import { ReactComponent as HeartFilled } from "../../Assets/Images/HEART_FILLED.svg";
import RNLogo from "../../Assets/Images/RN_LOGO.png";
import { ReactComponent as SearchIcon } from "../../Assets/Images/SEARCH_ICON.svg";
import { RootState } from "../../Redux/store";
import { searchCharacter } from "./searchApis";
import { motion } from "framer-motion";

export interface CharacterData {
  char_id: number;
  name: string;
  isFav: boolean;
  img: string;
  nickname: string;
  birthday: string;
  appearance: number[];
  portrayed: string;
  occupation: string[];
}

const Home = () => {
  const characterArr = useSelector((state: RootState) => state.characterArr);
  const [allCharacters, setAllCharacters] = useState<CharacterData[]>([]);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [slideIn, setSlideIn] = useState<string>("0%");
  const history = useNavigate();

  useEffect(() => {
    setFirstRender(true);
  }, []);

  useEffect(() => {
    if (allCharacters.length === 0) {
      setAllCharacters(characterArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterArr]);

  useEffect(() => {
    console.log("searchText ", searchText);

    if (searchText !== undefined) {
      const delayDebounceFn = setTimeout(() => {
        searchData(searchText ?? "");
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const searchData = (value: string) => {
    searchCharacter(value)
      .then((res) => {
        setAllCharacters(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RenderLeft = () => {
    return (
      <div className={styles.leftHeaderView}>
        <img src={RNLogo} alt="RNLogo" />
        <p className="breaking-bad-title">The Breaking bad</p>
      </div>
    );
  };

  const RenderRight = useCallback(() => {
    return (
      <div className={styles.rightHeaderView}>
        <div className={styles.searchIconView}>
          <input
            className={
              showSearchBar
                ? styles.textfield
                : firstRender
                ? styles.textfield_active
                : styles.textfield_hidden
            }
            value={searchText}
            type="text"
            onChange={(text) => {
              setSearchText(text.target.value);
            }}
            placeholder="Search"
            autoComplete="false"
          />

          <div
            className={styles.searchIcon}
            onClick={() => {
              setShowSearchBar(!showSearchBar);
            }}
          >
            <SearchIcon />
          </div>
        </div>
        <div
          className={styles.likeIconView}
          onClick={() => {
            history("/favorites");
          }}
        >
          <HeartFilled />
        </div>
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSearchBar]);

  return (
    <>
      <motion.div
        initial={{ translateX: "-100%" }}
        animate={{ translateX: 0 }}
        transition={{ ease: "easeIn" }}
      >
        <Header RenderLeft={RenderLeft} RenderRight={RenderRight} />
        <div className={styles.grid}>
          <RenderCharacters characterData={allCharacters} history={history} />
        </div>
      </motion.div>
    </>
  );
};

export default Home;