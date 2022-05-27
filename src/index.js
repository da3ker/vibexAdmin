import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ScrollToTop from "./components/scrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AnimatePresence>
          <BrowserRouter>
            <ScrollToTop />
            <GlobalStyles />
            <App />
          </BrowserRouter>
        </AnimatePresence>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
