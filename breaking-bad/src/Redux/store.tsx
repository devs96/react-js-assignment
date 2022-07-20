import { createStore } from "redux";

// import { reducer } from "./reducer";
import rootReducer from "../Redux/Reducers";

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;

export { store };
