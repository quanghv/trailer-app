import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Image, Alert, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Input,
  Button,
  Text,
  Item,
  Icon,
  Spinner
} from "native-base";
import { NavigationActions } from "react-navigation";
import config from "../config";
import { actionTypes } from "../config/actions";
import { dispatchDataFromApiPost, dispatchDataFromApiGet } from "../actions";

class Login extends React.Component {
  state = {
    phone: undefined,
    password: undefined,
    phoneError: false,
    passError: false,
    isSubmitted: false,
    isLoading: true
  };
  componentWillMount = async () => {
    /**
     * check thong tin tai khoan trong session
     * neu co -> chuyen sang tab
     * chua co -> hien form dang nhap
     */
    const phone = await AsyncStorage.getItem(config.storages.phone);
    // console.log(phone, "phone");
    setTimeout(() => {
      if (phone) {
        // this._goTabScreen();
        this.props.dispatchDataFromApiGet(actionTypes.USER_INFO, { phone });
      } else {
        this.setState({ isLoading: false });
      }
    }, 1000);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.accountReducer) {
      const accountReducer = nextProps.accountReducer;
      // console.log(accountReducer, "props");

      this.setState({ isSubmitted: false });
      //check reducer from api
      if (accountReducer.status < 0) {
        this.setState({ phoneError: true, passError: true });
        Alert.alert(config.strings.error, accountReducer.message);
      } else {
        //luu tai khoan
        this._setLoggedData(accountReducer.data);

        //khong goi lai Login khi back
        //no callback from navigation:
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "TabNav" })]
        });
        this.props.navigation.dispatch(resetAction);
      }
    }
  };

  _submit = () => {
    if (!this.state.phone) {
      //check phone is required
      this.setState({ phoneError: true });
      Alert.alert(config.strings.error, config.strings.phoneRequired);
    } else if (!this.state.password) {
      //check pass is required
      this.setState({ passError: true });
      Alert.alert(config.strings.error, config.strings.passRequired);
    } else {
      this.setState({ isSubmitted: true });
      setTimeout(
        () =>
          //call api
          this.props.dispatchDataFromApiPost(actionTypes.LOGIN, {
            phone: this.state.phone,
            password: this.state.password
          }),
        3000
      );
    }
  };

  _setLoggedData = async account => {
    const multiSets = [
      [config.storages.phone, account.phone.toString()],
      [config.storages.fullname, account.fullname]
    ];
    try {
      await AsyncStorage.multiSet(multiSets);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log(this.state, "state");
    let view;
    if (this.state.isLoading) {
      view = <Spinner />;
    } else {
      view = (
        <View>
          <Item rounded style={styles.item} error={this.state.phoneError}>
            <Icon name="person" />
            <Input
              placeholder={config.strings.phone}
              value={this.state.phone}
              onChangeText={phone =>
                this.setState({ phone, phoneError: false })}
              keyboardType={"phone-pad"}
              returnKeyType={"next"}
              onSubmitEditing={() => this.inputPass._root.focus()}
            />
          </Item>

          <Item rounded style={styles.item} error={this.state.passError}>
            <Icon name="key" />
            <Input
              ref={inputPass => {
                this.inputPass = inputPass;
              }}
              secureTextEntry
              placeholder={config.strings.password}
              value={this.state.password}
              onChangeText={password =>
                this.setState({ password, passError: false })}
              returnKeyType={"done"}
              keyboardType={"numeric"}
              onSubmitEditing={this._submit}
            />
          </Item>

          {!this.state.isSubmitted && (
            <Button
              block
              style={styles.loginBtn}
              rounded
              onPress={this._submit}
            >
              <Text>{config.strings.login}</Text>
            </Button>
          )}
          {this.state.isSubmitted && <Spinner />}
        </View>
      );
    }
    return (
      <Container>
        <Content
          style={styles.contentStyle}
          contentContainerStyle={styles.containerStyle}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentLogo}>
            <Image source={config.images.logo} style={styles.logo} />
          </View>
          {view}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  contentStyle: { backgroundColor: "white" },
  containerStyle: {
    flex: 1,
    width: "85%",
    alignSelf: "center",
    justifyContent: "center"
  },
  contentLogo: {
    alignSelf: "center",
    marginBottom: 60,
    shadowOffset: { width: 1, height: 0 },
    backgroundColor: config.colors.brandPrimary,
    padding: 15,
    borderRadius: 100 / 2
  },
  logo: {
    width: config.metrics.DEVICE_WIDTH / 4,
    height: config.metrics.DEVICE_WIDTH / 4
  },
  loginBtn: {
    marginVertical: 30
  },
  item: { marginTop: 15, paddingLeft: 15 }
});

const mapStateToProps = state => ({
  accountReducer: state.accountReducer
});

export default connect(mapStateToProps, {
  dispatchDataFromApiPost,
  dispatchDataFromApiGet
})(Login);
