import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import { Provider } from "react-redux";
import { RefreshContextProvider } from "../../contexts/RefreshContext";
import { ToastsProvider, ToastListener } from "../../contexts/ToastContext";
import store from "../../state";
import { getLibrary } from "../../utils/web3React";
import ModalProvider from "../Modal/ModalContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AppWalletProvider from "../../contexts/AppContext";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../state";
import { Updaters } from "../Updaters";
import { SWRConfig } from "swr";
import { fetchStatusMiddleware } from "../../hooks/useSWRContract";
import { usePollBlockNumber } from "../../state/block/hooks";

function GlobalHooks() {
  usePollBlockNumber();
  return null;
}

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AppWalletProvider>
          <ToastsProvider>
            <ToastListener />
            <SWRConfig
              value={{
                use: [fetchStatusMiddleware],
              }}
            >
              <RefreshContextProvider>
                <ModalProvider>
                  <GlobalHooks />
                  <PersistGate loading={null} persistor={persistor}>
                    <Updaters />
                    <Navbar />
                    {/* Fixed navbar space */}
                    <div className="h-[60px] invisible" />
                    {props.children}
                    <Footer />
                  </PersistGate>
                </ModalProvider>
              </RefreshContextProvider>
            </SWRConfig>
          </ToastsProvider>
        </AppWalletProvider>
      </Provider>
    </Web3ReactProvider>
  );
}
