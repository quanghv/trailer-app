import { Platform } from "react-native";

const enviroment = {
  PRO: "PRO",
  DEV: "DEV"
};

module.exports = {
  hostUrl: "http://192.168.100.43:613/",
  enviroment: enviroment.DEV,
  timeoutTryAgain: 1000,
  iconSize: Platform.OS === "ios" ? 24 : 24
};
