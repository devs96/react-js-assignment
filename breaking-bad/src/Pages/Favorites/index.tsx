import Header from "../../Components/Header";
import { ReactComponent as BackIcon } from "../../Assets/Images/BACK_ICON.svg";
import RNLogo from "../../Assets/Images/RN_LOGO.png";

import { useNavigate } from "react-router-dom";

import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import RenderCharacters from "../../Components/RenderCharacters";
import { motion } from "framer-motion";

const Favorites = () => {
  const favoriteArray = useSelector((state: RootState) => state.favArr);
  const history = useNavigate();

  const RenderLeft = () => {
    return (
      <div
        className="leftBackButton"
        onClick={() => {
          history(-1);
        }}
      >
        <BackIcon />
      </div>
    );
  };

  const RenderMiddle = () => {
    return (
      <div className="middle-header-view">
        <img src={RNLogo} alt="RNLogo" />
        <p className="breaking-bad-title">The Breaking bad</p>
      </div>
    );
  };

  const RenderRight = () => {
    return <p className="sub-title">Favorites</p>;
  };

  return (
    <motion.div
      initial={{ translateX: "100%" }}
      animate={{ translateX: 0 }}
      transition={{ ease: "easeIn" }}
    >
      <Header
        RenderLeft={RenderLeft}
        RenderMiddle={RenderMiddle}
        RenderRight={RenderRight}
      />
      <div className="grid">
        <RenderCharacters characterData={favoriteArray} history={history} />
      </div>
    </motion.div>
  );
};

export default Favorites;
