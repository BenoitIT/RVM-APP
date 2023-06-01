import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  useFonts,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform, NativeModules } from "react-native";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
import { setCurrentPage } from "../../redux/multisSteps/multiStepFormSlice";
import { getAllowedBottles } from "../../api_manger/Bottle_Api";
import { useDispatch } from "react-redux";
import toaster from "../contents/Toaster";
import { saveBottleType } from "../../redux/multisSteps/RecyclablesData";
import { i18n } from "../contents/locale/translation";
const { StatusBarManager } = NativeModules;

const CanType = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [data, setData] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getAllowedBottles().then((result) => {
      setLoader(true);
      const res = result.data.data;
      const bottleTypes = res.map((obj) => {
        const { id, bottleType, ...rest } = obj;
        return {
          ...rest,
          key: id,
          value: bottleType,
        };
      });
      setData(bottleTypes);
      setLoader(false);
    });
  }, []);
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
    semibold: Jost_700Bold,
    medium: Jost_500Medium,
    regular: Jost_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleGoToNextPage = () => {
    if (!selected) return toaster(i18n.t("selectbottletype"), "orange");
    dispatch(saveBottleType(selected));
    dispatch(setCurrentPage(3));
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <ScrollView>
        <View className="mt-[3vh]">
          <View className="border-b-3 shadow-md border-gray-800 mb-[10vh] py-[3vh]">
            <AppHeader />
          </View>
          <Text className="text-gray-600 font-[semibold] text-2xl mb-[5vh] text-center w-[90vw] mx-auto">
            {i18n.t("getReverse")}
          </Text>
          <View className=" px-[10vw]">
            <Text className="text-gray-600 text-lg my-2 font-[medium]">
              {i18n.t("selectbottletype")}
            </Text>
            {loader && <ActivityIndicator size="small" color="#00ff00" />}
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              placeholder={i18n.t("selectbottletype")}
            />
          </View>
          <View className="py-20">
            <CustomButton
              onPress={handleGoToNextPage}
              title={i18n.t("next")}
              text="font-[extraBold] text-sm capitalize text-white text-center"
              bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CanType;
