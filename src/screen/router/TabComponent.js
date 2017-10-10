import React, { PureComponent } from "react";
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import config from "../../config";

export default class TabComponent extends PureComponent {
  _gotoScreen = screen => () => {
    this.props.navigation.navigate(screen);
  };
  render() {
    // console.log(this.props, "props TabComponent");
    const { index } = this.props.navigationState;
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            active={index === 0}
            onPress={this._gotoScreen("PhimBo")}
          >
            <Icon name="ios-film" />
            <Text>{config.strings.phimBo}</Text>
          </Button>
          <Button
            vertical
            active={index === 1}
            onPress={this._gotoScreen("PhimLe")}
          >
            <Icon name="ios-film-outline" />
            <Text>{config.strings.phimLe}</Text>
          </Button>
          <Button
            vertical
            active={index === 2}
            onPress={this._gotoScreen("PhimRap")}
          >
            <Icon name="ios-recording" />
            <Text>{config.strings.phimChieuRap}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
