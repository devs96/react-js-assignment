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
            <div key={index.toString()} className="seasonView">
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
            <div key={index.toString()} className="individualCharView">
              <img
                className="otherCharImg"
                alt="background-img"
                src={element.img}
              />
              <p className="otherCharName">{element.name}</p>
              <p className="otherCharNickname">{element.nickname}</p>
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
          className="imageContainer"
          style={{ backgroundImage: "url(" + charData.img + ")" }}
        >
          <div
            onClick={() => {
              history(-1);
            }}
            className="backIconView"
          >
            <BackIcon />
          </div>
          <div className="transparentView">
            <img className="bgImg" alt="backgroundImg" src={charData.img} />
            <p className="headerName">{charData.name}</p>
            <p className="headerNickname">{charData.nickname}</p>
          </div>
        </div>
        <div className="dataContainer">
          <p className="title">Portrayed</p>
          <div className="dateView">
            <p className="description">Bryan Carson</p>

            {charData.birthday !== "Unknown" && (
              <div className="birthdayView">
                <BirthdayIcon />
                <p className="description">{charData.birthday}</p>
              </div>
            )}
          </div>
          <div className="section">
            <p className="title">Occupation</p>
            <p className="description">{charData.occupation?.[0]}</p>
            <p className="description">{charData.occupation?.[1]}</p>
          </div>
          <div className="section">
            <p className="title">Appeared in</p>
            <div className="appearedView">
              <RenderAppearedIn />
            </div>
          </div>
          <div className="section">
            <p className="otherChar">Other Characters</p>
            <div className="otherCharView">
              <RenderOtherChar />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CharacterDetails;
