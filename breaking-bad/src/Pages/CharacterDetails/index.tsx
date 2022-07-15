import "./index.css";

import { useLocation, useNavigate } from "react-router-dom";
import { CharacterData } from "../Home";
import { ReactComponent as BackIcon } from "../../Assets/Images/BACK_ICON.svg";
import { ReactComponent as BirthdayIcon } from "../../Assets/Images/BIRTHDAY.svg";
import { motion } from "framer-motion";

interface locationState {
  charData: CharacterData;
  otherCharacters: CharacterData[];
}

const CharacterDetails = () => {
  const RenderAppearedIn = () => {
    return (
      <>
        {charData.appearance.map((item, index) => {
          return (
            <div key={index.toString()} className="season-view">
              <p>Season {item}</p>
            </div>
          );
        })}
      </>
    );
  };

  const RenderOtherChar = () => {
    return (
      <>
        {otherCharacters.map((element, index) => {
          return (
            <div key={index.toString()} className="individual-char-view">
              <img
                className="other-char-img"
                alt="background-img"
                src={element.img}
              />
              <p className="other-char-name">{element.name}</p>
              <p className="other-char-nickname">{element.nickname}</p>
            </div>
          );
        })}
      </>
    );
  };

  const { state } = useLocation();
  const { charData, otherCharacters } = state as locationState;
  const history = useNavigate();

  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      transition={{ ease: "easeIn" }}
    >
      <div className="container">
        <div
          className="image-container"
          style={{ backgroundImage: "url(" + charData.img + ")" }}
        >
          <div
            onClick={() => {
              history(-1);
            }}
            className="back-icon-view"
          >
            <BackIcon />
          </div>
          <div className="transparent-view">
            <img className="bg-img" alt="background-img" src={charData.img} />
            <p className="header-name">{charData.name}</p>
            <p className="header-nickname">{charData.nickname}</p>
          </div>
        </div>
        <div className="data-container">
          <p className="title">Portrayed</p>
          <div className="date-view">
            <p className="description">Bryan Carson</p>

            {charData.birthday !== "Unknown" && (
              <div className="birthday-view">
                <BirthdayIcon />
                <p className="description">{charData.birthday}</p>
              </div>
            )}
          </div>
          <div className="section">
            <p className="title">Occupation</p>
            <p className="description">{charData.occupation?.[0]}</p>
            <p className="second-occupation-text">{charData.occupation?.[1]}</p>
          </div>
          <div className="section">
            <p className="title">Appeared in</p>
            <div className="appeared-view">
              <RenderAppearedIn />
            </div>
          </div>
          <div className="section">
            <p className="other-char">Other Characters</p>
            <div className="other-char-view">
              <RenderOtherChar />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterDetails;
