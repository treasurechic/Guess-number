import React from "react";
import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MainButton } from "../components/MainButton";
import colors from "../constants/colors";
import defaultStyles from "../constants/defaultStyles";

export const GameOverScreen = ({ roundsNumber, userNumber, startAgain }) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={{ ...defaultStyles.title }}>Game is over</Text>
        <View style={styles.imageContainer}>
          <Image
            // source={require("../assets/checked.png")}
            source={{
              uri: "https://static.toiimg.com/thumb/resizemode-4,msid-83541279,imgsize-86286,width-720/83541279.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={{ ...defaultStyles.text, ...styles.resultText }}>
          You phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number <Text>{userNumber}</Text>
        </Text>
        <MainButton onPress={startAgain}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  resultText: {
    textAlign: "center",
    marginHorizontal: 30,
    fontSize: Dimensions.get("window").height > 400 ? 20 : 16,
  },
  highlight: {
    color: colors.primary,
    fontFamily: "brown-bd",
  },
});
