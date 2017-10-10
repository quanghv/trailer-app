import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal, View, AsyncStorage, StyleSheet } from "react-native";
import {
  Header,
  Thumbnail,
  Text,
  ListItem,
  Button,
  Left,
  Right,
  Icon,
  Body
} from "native-base";
import { NavigationActions } from "react-navigation";
import config from "../config";

class Profile extends PureComponent {
  state = {
    phone: undefined,
    fullname: undefined
  };
  componentWillMount = () => {
    // console.log("cwm");
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          const key = store[i][0];
          const value = store[i][1];
          if (key === config.storages.phone) {
            this.setState({ phone: value });
          }
          if (key === config.storages.fullname) {
            this.setState({ fullname: value });
          }
        });
      });
    });
  };

  _removeStorage = async () => {
    // console.log(this.props);
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log("error", error);
    }
    this.props.onClose();

    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Login" })]
    });
    this.props.navigation.dispatch(resetAction);
    // this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <Modal visible={this.props.visible} onRequestClose={this.props.onClose}>
        <Header style={styles.header}>
          <Left>
            <Button transparent primary onPress={this.props.onClose}>
              <Icon name={"arrow-back"} />
            </Button>
          </Left>
          <Body />
          <Right />
        </Header>
        <View style={styles.view}>
          <View style={styles.logo}>
            <Thumbnail source={config.images.logo} />
          </View>
          <ListItem icon first>
            <Left>
              <Icon name="call" />
            </Left>
            <Body>
              <Text>{this.state.phone}</Text>
            </Body>
            <Right />
          </ListItem>
          <ListItem last>
            <Left>
              <Icon name="person" />
            </Left>
            <Body>
              <Text>{this.state.fullname}</Text>
            </Body>
            <Right />
          </ListItem>
          <Button block bordered onPress={this._removeStorage}>
            <Text>{config.strings.logout}</Text>
          </Button>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  header: { backgroundColor: "transparent", elevation: 0 },
  view: { width: "80%", alignSelf: "center" },
  logo: {
    backgroundColor: config.colors.brandPrimary,
    borderRadius: 100 / 2,
    alignSelf: "center",
    padding: 15,
    marginBottom: 30
  }
});
const mapStateToProps = state => ({
  accountInfo: state.accountReducer.data
});
export default connect(mapStateToProps)(Profile);
