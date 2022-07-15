import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../Pages/Home";
import CharacterDetails from "../Pages/CharacterDetails";
import Favorites from "../Pages/Favorites";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location}>
        <Route index element={<Home />} />
        <Route path="/character" element={<CharacterDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </AnimatePresence>
  );
};
export default AnimatedRoutes;
