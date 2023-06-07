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
import {
  showActiveLanguage,
  setCurrentLanguage,
  setActiveLanguage,
} from "../../redux/locale/languagesSlice";
import { i18n } from "../contents/locale/translation";
import languageCorrection from "./languageCorrection";
import AppHeader from "./AppHeader";
const { StatusBarManager } = NativeModules;

const DashLanguages = ({ navigation }) => {
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
        <View className="border-b-3 shadow-md border-gray-800 py-[3vh] w-full">
          <AppHeader />
        </View>
        <View className=" px-[10vw] my-10">
          {languageCorrection.map((language) => (
            <TouchableOpacity
              key={language.id}
              onPress={() => handleChangeLocale(language)}
            >
              <View className="flex flex-row mx-auto my-1 bg-transparent w-full px-[10vw] py-[3vh] shadow-md border-1 border-transparent">
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
      </ScrollView>
    </SafeAreaView>
  );
};
export default DashLanguages;
