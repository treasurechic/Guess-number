import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "../components/Card";
import { MainButton } from "../components/MainButton";
import { NumberContainer } from "../components/NumberContainer";
import defaultStyles from "../constants/defaultStyles";
import { AntDesign } from "@expo/vector-icons";

const GenerateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.floor(Math.random() * (max - min)) + min;
  if (random === exclude) {
    return GenerateRandomBetween(min, max, exclude);
  } else {
    return random;
  }
};

const renderListItem = (value, numbOfRounds) => (
  <View key={value} style={styles.listItem}>
    <Text style={{ ...defaultStyles.text }}>#{numbOfRounds}</Text>
    <Text style={{ ...defaultStyles.text }}>{value}</Text>
  </View>
);
export const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = GenerateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // console.log(initialGuess)
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  console.log(pastGuesses);
  const [guessRounds, setGuessRounds] = useState(0);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  useEffect(() => {
    if (currentGuess == userChoice) {
      onGameOver(guessRounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "higher" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = GenerateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setGuessRounds((guessRounds) => guessRounds + 1);
    setPastGuesses((current) => [nextNumber, ...current]);
  };
    return (
    <ScrollView>
    <View style={styles.screen}>
      <Text style={{ ...defaultStyles.text }}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card styles={styles.buttonContainer}>
        <MainButton
          onPress={() => {
            nextGuessHandler("lower");
          }}
          style={{ ...styles.button, marginRight: 10 }}
        >
          <AntDesign name="pluscircleo" size={18} />
          LOWER
        </MainButton>

        <MainButton
          onPress={() => {
            nextGuessHandler("higher");
          }}
          style={styles.button}
        >
          <AntDesign name="minuscircleo" size={18} />
          GREATER
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 8,
    width: 400,
    maxWidth: "90%",
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  listContainer: {
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    flex: 1,
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
