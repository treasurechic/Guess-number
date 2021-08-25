import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Header } from "./components/Header";
import { GameOverScreen } from "./screens/GameOverScreen";
import { GameScreen } from "./screens/GameScreen";
import { StartGameScreen } from "./screens/StartGameScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "brown-rg": require("./assets/fonts/BrownBold/brown-regular.otf"),
    "brown-bd": require("./assets/fonts/BrownBold/BrownBold.ttf"),
  });
};
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setIsLoading(false);
        }}
        onError={(error) => console.log(error)}
      />
    );
  }
  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };
  const startGame = (selectedNumber) => {
    console.log(selectedNumber);
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };
  const configureNewGame = () => {
    setGuessRounds(0);
    setUserNumber(0);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Guess a Number"} />
      {userNumber && guessRounds <= 0 ? (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      ) : guessRounds > 0 ? (
        <GameOverScreen
          userNumber={userNumber}
          roundsNumber={guessRounds}
          startAgain={configureNewGame}
        />
      ) : (
        <StartGameScreen onStart={startGame} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
