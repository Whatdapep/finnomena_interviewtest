import logo from "./logo.svg";
import "./App.css";
import ListRangeFunds from "./components/ListRangeFunds";
import store from "./store/index";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto">
        <ListRangeFunds />
      </div>
    </Provider>
  );
}

export default App;
