import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({ title, text, bgView }) => {
  return (
    <TouchableOpacity className={bgView}>
      <Text className={text}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
