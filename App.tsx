import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppRouters from "./src/routers/AppRouters";
import { Provider } from "react-redux";
import store from "./src/redux/store";


const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />

        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
