import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({ title, text, bgView ,onPress }) => {
  return (
    <TouchableOpacity className={bgView} onPress={onPress}>
      <Text className={text}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
