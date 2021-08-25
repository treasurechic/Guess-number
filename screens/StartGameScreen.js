import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Card } from "../components/Card";
import { MainButton } from "../components/MainButton";
import { NumberContainer } from "../components/NumberContainer";
import { SharedInput } from "../components/SharedInput";
import Colors from "../constants/colors";
import defaultStyles from "../constants/defaultStyles";

export const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  useEffect(() => {
    setScreenWidth(Dimensions.get("window").width);
  }, [Dimensions.get("window").width]);

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number has to be between 1-99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setSelectedNumber(chosenNumber);
    setConfirmed(true);
    setEnteredValue("");
    Keyboard.dismiss();
  };
  let confirmedOutPut;

  if (confirmed) {
    confirmedOutPut = (
      <Card styles={{ marginTop: 20, alignItems: "center" }}>
        <Text style={{ ...defaultStyles.text }}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStart(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={{ ...defaultStyles.title, ...styles.title }}>
              Start a new Game!
            </Text>
            <Card styles={styles.inputContainer}>
              <View style={styles.inputContainer}>
                <Text style={{ ...defaultStyles.text }}>Select a Number</Text>
                <SharedInput
                  styles={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={(e) => numberInputHandler(e)}
                  value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                  <View style={{ width: screenWidth / 4 }}>
                    <Button
                      title="Reset"
                      color={Colors.accent}
                      onPress={resetInputHandler}
                    />
                  </View>
                  <View style={{ width: screenWidth / 4 }}>
                    <Button
                      title="Confirm"
                      color={Colors.primary}
                      onPress={confirmInputHandler}
                    />
                  </View>
                </View>
              </View>
            </Card>
            {confirmedOutPut}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "brown-bd",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  button: {
    // width: 100,
    // width: Dimensions.get("window").width / 4,
  },
  input: {
    width: 100,
    textAlign: "center",
  },
});
