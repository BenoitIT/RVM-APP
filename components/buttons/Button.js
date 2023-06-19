import React from "react";
import { TouchableOpacity, Text } from "react-native";

const CustomButton = ({ title, text, bgView ,onPress,disabled }) => {
  return (
    <TouchableOpacity className={bgView} onPress={onPress} disabled={disabled}>
      <Text className={text}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
