import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { StyleProvider } from "native-base";
import { Font, AppLoading } from "expo";
import Router from "./screen/router";
import allReducers from "./reducers";

import getTheme from "../native-base-theme/components";
import commonColor from "../native-base-theme/variables/commonColor";

import config from "./config";

const store = createStore(allReducers, applyMiddleware(thunk));

export default class App extends Component {
  state = { isLoading: true };
  componentWillMount = async () => {
    await Font.loadAsync({
      Roboto: config.fonts.Roboto,
      Roboto_medium: config.fonts.Roboto_medium
    });
    this.setState({ isLoading: false });
  };

  render() {
    if (this.state.isLoading) return <AppLoading />;
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(commonColor)}>
          <Router />
        </StyleProvider>
      </Provider>
    );
  }
}
