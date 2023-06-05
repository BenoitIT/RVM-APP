import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useFonts, Jost_800ExtraBold } from "@expo-google-fonts/jost";
import { useNavigation } from "@react-navigation/native";
const AppHeader = () => {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View className="flex flex-row justify-between mx-10">
      <Text
        style={{
          fontSize: 25,
          fontFamily: "extraBold",
          textAlign: "center",
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textShadowOffset: { width: 1, height: 3 },
          textShadowRadius: 2,
        }}
      >
        _RVM_
      </Text>
      <TouchableOpacity
        style={{
          fontSize: 30,
          marginTop: 10,
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textShadowOffset: { width: 1, height: 3 },
          textShadowRadius: 2,
        }}
        onPress={() => navigation.openDrawer()}
      >
        <View>
          <Entypo name="menu" size={30} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default AppHeader;
