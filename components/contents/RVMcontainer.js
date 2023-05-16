import React from "react";
import { View, Image, Text } from "react-native";
const RVMcontainer = () => {
  return (
    <View
      style={{
        width: 350,
        height: 350,
        backgroundColor: "#e5e7eb",
        borderRadius: 500,
      }}
    >
      <Image
        style={{ width: 270, height: 400, marginTop: -20, marginLeft: 40 }}
        source={require("../../assets/RVM.png")}
      />
      <Text>..</Text>
    </View>
  );
};
export default RVMcontainer;
