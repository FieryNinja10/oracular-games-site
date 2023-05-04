import "@/styles/globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
};

export default App;
