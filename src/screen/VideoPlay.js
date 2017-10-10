import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenOrientation, Video } from "expo";
// import VideoPlayer from "@expo/videoplayer";

import VideoPlayer from "../components/VideoPlayer";

import config from "../config";

export default class VideoPlay extends React.Component {
  state = {
    isPortrait: true
  };
  //   componentDidMount() {
  //     ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
  //     Dimensions.addEventListener("change", this.orientationChangeHandler);
  //   }

  //   componentWillUnmount() {
  //     ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  //     Dimensions.removeEventListener("change", this.orientationChangeHandler);
  //   }
  switchToLandscape() {
    this.setState({ isPortrait: false });
    ScreenOrientation.allow(ScreenOrientation.Orientation.LANDSCAPE);
  }

  switchToPortrait() {
    this.setState({ isPortrait: true });
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
  }

  //   orientationChangeHandler = () => {
  //     const isLandscape =
  //       config.metrics.DEVICE_WIDTH > config.metrics.DEVICE_WIDTH;
  //     this.setState({ isPortrait: !isLandscape });
  //     // this.props.navigation.setParams({ tabBarHidden: isLandscape });
  //     ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
  //   };

  render() {
    return (
      <View style={styles.container}>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri:
                "http://192.168.100.43:613/assets/video/Spider-Man-Homecoming.mp4"
            },
            isMuted: false,
            ref: component => {
              this._playbackInstance = component;
            }
          }}
          isPortrait={this.state.isPortrait}
          playFromPositionMillis={0}
          switchToLandscape={this.switchToLandscape}
          switchToPortrait={this.switchToPortrait}
        />
        {/* <WebView
          source={{ uri: "https://www.youtube.com/embed/n9DwoQ7HWvI" }}
          style={styles.frame}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  frame: {
    backgroundColor: "yellow",
    marginTop: 0,
    width: config.metrics.DEVICE_WIDTH
  }
});
