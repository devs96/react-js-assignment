import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import RenderCharacters from "../../Components/RenderCharacters";
import styles from "./home.module.css";

import { useSelector } from "react-redux";
import { ReactComponent as HeartFilled } from "../../Assets/Images/HEART_FILLED.svg";
import { ReactComponent as SearchIcon } from "../../Assets/Images/SEARCH_ICON.svg";
import { RootState } from "../../Redux/store";
import { searchCharacter } from "./searchApis";
import { motion } from "framer-motion";

import { ReactComponent as Logo } from "../../Assets/Images/RN_LOGO.svg";

export interface CharacterData {
  char_id: number;
  name: string;
  img: string;
  nickname: string;
  birthday: string;
  appearance: number[];
  portrayed: string;
  occupation: string[];
}

const Home = () => {
  const characterArr = useSelector(
    (state: RootState) => state.characters.characterArr
  );
  const [allCharacters, setAllCharacters] = useState<CharacterData[]>([]);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useNavigate();

  useEffect(() => {
    setFirstRender(true);
  }, []);

  useEffect(() => {
    if (allCharacters && allCharacters.length === 0) {
      setIsLoading(true);
      setAllCharacters(characterArr);
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterArr]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchData(searchText ?? "");
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const searchData = (value: string) => {
    searchCharacter(value)
      .then((res) => {
        setAllCharacters(res);
        console.log(res);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RenderLeft = () => {
    return (
      <div className={styles.leftHeaderView}>
        <Logo />
        <p className={styles.breakingBadTitle}>The Breaking bad</p>
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
            onChange={(text) => {
              setSearchText(text.target.value);
              setIsLoading(true);
            }}
            placeholder="Search"
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

        {isLoading ? (
          <div className={styles.loaderView}>
            <div className={styles.loader} />
          </div>
        ) : allCharacters && allCharacters.length !== 0 ? (
          <div className={styles.grid}>
            <RenderCharacters characterData={allCharacters} history={history} />
          </div>
        ) : (
          <div className={styles.loaderView}>
            <p className={styles.emptyRecords}>No records found</p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Home;
