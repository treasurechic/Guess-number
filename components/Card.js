import React from "react";
import { StyleSheet, View } from "react-native";

export const Card = (props) => {
  return <View style={{...styles.card, ...props.styles}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    //iphone shadow styles
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    //*** */
    //For android shadow style
    elevation: 5,
    //*** */
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
