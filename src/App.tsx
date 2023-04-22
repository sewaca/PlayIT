import { Provider } from "react-redux";
import { Background, Navbar } from "~/components/";
import { store } from "~/store/";
import Routes from "~/features/Routes";
import { OpenPage, ClosePage, CreateError } from "~/context";

function App() {
  return (
    // Redux
    <Provider store={store}>
      {/* Contexts */}
      <OpenPage>
        <ClosePage>
          <CreateError>
            {/* APP: */}
            <Background />
            <Navbar />
            <Routes />
            {/* / APP */}
          </CreateError>
        </ClosePage>
      </OpenPage>
    </Provider>
  );
}

export default App;
