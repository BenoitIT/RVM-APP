import { View, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";
const AppHeader = () => {
  return (
    <View className="flex flex-row justify-between mx-10">
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textShadowOffset: { width: 1, height: 3 },
          textShadowRadius: 2,
        }}
      >
        _RVM_
      </Text>
      <View
        style={{
          fontSize: 30,
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textShadowOffset: { width: 1, height: 3 },
          textShadowRadius: 2,
        }}
      >
        <Entypo name="menu" size={30} color="black" />
      </View>
    </View>
  );
};
export default AppHeader;
