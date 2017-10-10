import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import TabComponent from "./TabComponent";
import Login from "../Login";
import PhimBo from "../tab/PhimBo";
import PhimLe from "../tab/PhimLe";
import PhimRap from "../tab/PhimRap";

export const TabNav = TabNavigator(
  {
    PhimBo: { screen: PhimBo },
    PhimLe: { screen: PhimLe },
    PhimRap: { screen: PhimRap }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    tabBarComponent: props => <TabComponent {...props} />
  }
);

const Router = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    TabNav: { screen: TabNav }
  },
  {
    mode: "card"
  }
);

export default Router;
