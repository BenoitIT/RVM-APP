import React from "react";
import { View, Image, Text } from "react-native";
const RVMcontainer = () => {
  return (
    <View
      style={{
        width: 340,
        height: 300,
        backgroundColor: "#e5e7eb",
        borderRadius: 500,
        marginLeft:25,
      }}
    >
      <Image
        style={{ width: 200, height: 340, marginTop: -20, marginLeft: 70 }}
        source={require("../../assets/RVM.png")}
      />
      <Text>..</Text>
    </View>
  );
};
export default RVMcontainer;
