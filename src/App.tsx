import { Provider } from "react-redux";
import { Background, Navbar } from "~/components/";
import { store } from "~/store/";
import Routes from "~/features/Routes";
import { OpenPage, ClosePage } from "~/context";

function App() {
  return (
    <Provider store={store}>
      <OpenPage>
        <ClosePage>
          <Background />
          <Navbar />
          <Routes />
        </ClosePage>
      </OpenPage>
    </Provider>
  );
}

export default App;
