import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export const SharedInput = (props) => {
  return (
    <View>
      <TextInput {...props} style={{ ...styles.input, ...props.styles }}  />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomColor: "grey",
    borderBottomWidth:1,
    marginVertical:10
  },
});
