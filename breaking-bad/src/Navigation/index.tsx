import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { typeActions } from "../Redux/actions";
import { getCharacterApi } from "../Redux/characterApis";
import AnimatedRoutes from "./animatedRoutes";

const NavigationContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCharactersApiCall();
  });

  const getCharactersApiCall = () => {
    getCharacterApi()
      .then((response) => {
        dispatch({ type: typeActions.CHARACTER_ARR, payload: response });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default NavigationContainer;
