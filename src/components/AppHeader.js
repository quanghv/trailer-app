import React, { PureComponent } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Header, Left, Right, Body, Title, Button, Icon } from "native-base";

import Profile from "./Profile";

export default class AppHeader extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string
  };
  state = { showProfile: false };
  _openProfile = () => {
    this.setState({ showProfile: true });
  };
  _closeProfile = () => {
    this.setState({ showProfile: false });
  };
  render() {
    return (
      <View>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="person" onPress={this._openProfile} />
            </Button>
          </Right>
        </Header>
        <Profile
          visible={this.state.showProfile}
          onClose={this._closeProfile}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}
