import { Provider } from "react-redux";
import NavigationContainer from "./Navigation";
import { store } from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

export default App;
