import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import { Platform, NativeModules } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import languageCorrection from "../contents/languageCorrection";
import {
  showActiveLanguage,
  setCurrentLanguage,
  setActiveLanguage,
} from "../../redux/locale/languagesSlice";
import { i18n } from "../contents/locale/translation";
const { StatusBarManager } = NativeModules;
const Language = ({ navigation }) => {
  const dispatch = useDispatch();
  const activeLanguage = useSelector(showActiveLanguage);
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
    semibold: Jost_700Bold,
    medium: Jost_500Medium,
    regular: Jost_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  const handleChangeLocale = (locale) => {
    i18n.locale = locale.key;
    dispatch(setCurrentLanguage(locale.key));
    dispatch(setActiveLanguage(locale.id));
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <ScrollView>
        <View className="mt-[20vh]">
          <Text className="text-gray-800 font-[semibold] text-2xl mb-[10vh] text-center opacity-80">
            {i18n.t("selectLng")}
          </Text>
          <View className=" px-[10vw]"></View>
          {languageCorrection.map((language) => (
            <TouchableOpacity
              key={language.id}
              onPress={() => handleChangeLocale(language)}
            >
              <View className="flex flex-row mx-auto my-1 bg-slate-100 w-full px-[20vw] py-[3vh] shadow-md border-1 border-transparent shadow-gray-300">
                <Image
                  style={{ width: 30, height: 20, marginTop: 4 }}
                  source={language.icon}
                />
                <Text className="mx-[10vw] text-gray-700 text-xl font-[medium]">
                  {language.name}
                </Text>
                <View
                  className={`ml-[4vw] ${
                    activeLanguage === language.id ? "" : "hidden"
                  }`}
                >
                  {language.activeLng}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("home")}
          className="bg-slate-100 shadow-md my-[10vh] w-auto mx-auto rounded-full py-2"
        >
          <Text className="text-center text-lg font-[medium] text-gray-800 px-[8vw]">
            {i18n.t("next")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Language;
