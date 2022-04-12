import React from "react";
import { ScrollView } from "react-native";

const ScrollComp = (props) => {
  return (
    <ScrollView
      style={{ marginTop: 15 }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {props.children}
    </ScrollView>
  );
};
export default ScrollComp;
