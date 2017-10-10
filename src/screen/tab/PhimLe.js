import React from "react";
import { FlatList, View, Alert, Image, StyleSheet } from "react-native";
import { Content, Text } from "native-base";
import AppHeader from "../../components/AppHeader";
import config from "../../config";
import actions from "../../config/actions";
import { getFromServer } from "../../actions";
import { parseJsonFromApi } from "../../helpers/apiHelper";

const imgWidth = config.metrics.DEVICE_WIDTH / 3 - 20;
const imgHeight = imgWidth * 345 / 230;

export default class PhimLe extends React.Component {
  static navigationOptions = {
    header: props => <AppHeader title={config.strings.phimLe} {...props} />
  };
  state = {
    data: undefined
  };
  componentWillMount = () => {
    this._getData();
  };

  _getData = () => {
    getFromServer(actions.urlMovieList, { type: "phimle" }).then(json => {
      const result = parseJsonFromApi(json);
      if (result.status === 1) {
        this.setState({ data: result.data });
      } else if (result.status === 0) {
        this.setState({ data: [] });
      } else {
        Alert.alert(config.strings.error, result.message);
      }
    });
  };

  _renderItem = ({ item }) => {
    const imgSource = { uri: config.settings.hostUrl + item.img };
    return (
      <View style={styles.movieItem}>
        <Image source={imgSource} style={styles.movieImage} />
        <View style={styles.movieName}>
          <Text numberOfLines={2} style={styles.movieNameText}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  _renderEmpty = () => {
    if (this.state.data === undefined) return null;
    return (
      <View style={styles.empty}>
        <Text>{config.strings.emptyList}</Text>
      </View>
    );
  };

  render() {
    return (
      <Content showsVerticalScrollIndicator={false}>
        <View style={styles.view}>
          <FlatList
            horizontal={false}
            numColumns={3}
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={this._renderItem}
            ListEmptyComponent={this._renderEmpty}
          />
        </View>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  movieItem: {
    margin: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    padding: 1
  },
  movieImage: {
    width: imgWidth,
    height: imgHeight
  },
  movieName: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    height: 48,
    padding: 5,
    justifyContent: "center",
    left: 0,
    right: 0
  },
  movieNameText: {
    fontSize: 14,
    color: "white",
    lineHeight: 22,
    textAlign: "center"
  },
  empty: {
    marginVertical: 15
  }
});
