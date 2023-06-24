import React from "react";
import { Platform, NativeModules } from "react-native";
import { useFonts, Jost_800ExtraBold } from "@expo-google-fonts/jost";
import { View, Text, SafeAreaView } from "react-native";
import RVMcontainer from "../contents/RVMcontainer";
import CustomButton from "../buttons/Button";
import { i18n } from "../contents/locale/translation";
const { StatusBarManager } = NativeModules;
export const Home = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <View className="mt-[5vh]">
        <View className="text-center mb-[10%]">
          <Text
            style={{
              fontFamily: "extraBold",
              fontSize: 35,
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.2)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2,
              color: "#003366",
            }}
          >
            {i18n.t("welcome")}
          </Text>
          <Text
            style={{
              fontFamily: "extraBold",
              fontSize: 24,
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.5)",
              textShadowOffset: { width: 1, height: 0.4 },
              textShadowRadius: 2,
              color: "#003366",
            }}
          >
            {i18n.t("rvm")}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "extraBold",
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.5)",
              textShadowOffset: { width: 1, height: 0.4 },
              textShadowRadius: 2,
              color: "#003366",
            }}
          >
            {i18n.t("app")}
          </Text>
        </View>
        <View className="mt-4">
          <RVMcontainer />
        </View>
        <View className="flex flex-col justify-center mx-[10%] mt-[10%]">
          <CustomButton
            title={i18n.t("login")}
            disabled={false}
            text="font-[extraBold] text-sm capitalize text-white text-center"
            bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-8"
            onPress={() => navigation.navigate("login")}
          />
          <CustomButton
            title={i18n.t("createAccount")}
            disabled={false}
            text="font-[extraBold] text-sm capitalize text-white text-center"
            bgView="flex justify-center  bg-gray-800 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-4"
            onPress={() => navigation.navigate("register")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Home;
