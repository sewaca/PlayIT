import { Provider } from "react-redux";
import { Background, Navbar } from "~/components/";
import { store } from "~/store/";
import Routes from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <Background />
      <Navbar />
      <Routes />
    </Provider>
  );
}

export default App;
