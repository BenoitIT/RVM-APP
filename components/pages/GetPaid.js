import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, ScrollView } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform, NativeModules } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import {
  fetchBalance,
  selectBalance,
} from "../../redux/rewards/getBalanceSlice";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
import toaster from "../contents/Toaster";
import { i18n } from "../contents/locale/translation";
const { StatusBarManager } = NativeModules;
const GetPaid = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([
    {
      key: 1,
      value: "MTN Mobile Money",
    },
    {
      key: 2,
      value: "AirTel Money",
    },
  ]);
  const balance = useSelector(selectBalance);
  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);
  const handleCashTransfer = () => {
    if (!selected) return toaster("select where to recieve money", "orange");
  };
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
    semibold: Jost_700Bold,
    medium: Jost_500Medium,
    regular: Jost_400Regular,
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
      <ScrollView>
        <View className="mt-[1vh]">
          <View className="border-b-3 shadow-md border-gray-800 mb-[3vh] py-[5vh]">
            <AppHeader />
          </View>
          <Text className="text-lime-600 font-[medium] text-2xl mb-[2vh] text-center">
            {i18n.t("paymentinfo")}
          </Text>
          <View className="mt-[3vh]">
            <Text className="text-center text-4xl font-[extraBold] capitalize text-slate-800">
              {i18n.t("currentBalance")}
            </Text>
            <Text className="text-center text-2xl font-[semibold] uppercase mt-[1vh] text-slate-800">
              {balance?.data} RWF
            </Text>
          </View>
          <View className=" px-[10vw]">
            <View>
              <Text className="text-gray-900 font-[medium] text-[2.2vh] text-left my-4 w-auto">
                {i18n.t("whereDoYouWantCash")}
              </Text>
              <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                placeholder="select where to recieve money"
              />
            </View>
            <View>
              <Text className="text-gray-600 font-[medium] text-lg text-left mt-4 mb-2">
                {i18n.t("enterMoney")}
              </Text>
              <TextInput
                keyboardType="numeric"
                className="border border-gray-500 text-black text-sm rounded-md focus:border-lime-600 block w-full  p-1 placeholder:pl-[5vw]"
                placeholder="Ex: 400"
                onChangeText={() => console.log("changed")}
              />
            </View>
            <View>
              <Text className="text-gray-600 font-[medium] text-lg text-left mt-2 mb-2">
                {i18n.t("EnterPhone")}
              </Text>
              <TextInput
                keyboardType="numeric"
                className="border border-gray-500 text-black text-sm rounded-md focus:border-lime-600 block w-full  p-1 placeholder:pl-[5vw]"
                placeholder="Ex: 078378..."
                onChangeText={() => console.log("changed")}
              />
            </View>
          </View>
          <View className="py-8">
            <CustomButton
              title={i18n.t("transfer")}
              disabled={false}
              text="font-bold text-sm capitalize text-white text-center"
              bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-5 w-[80vw] mx-auto"
              onPress={handleCashTransfer}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default GetPaid;
