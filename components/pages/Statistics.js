import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Platform, NativeModules } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Jost_800ExtraBold,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import {
  fetchBalance,
  selectBalance,
} from "../../redux/rewards/getBalanceSlice";
import Table from "../contents/Table";
import AppHeader from "../contents/AppHeader";
import CustomButton from "../buttons/Button";
import {
  fetchHistory,
  selectHistory,
  fetchStatus,
} from "../../redux/Contribution/GetContribution";
const { StatusBarManager } = NativeModules;
const Statistics = ({ navigation }) => {
  const dispatch = useDispatch();
  const histories = useSelector(selectHistory);
  const loader = useSelector(fetchStatus);
  const balance = useSelector(selectBalance);
  console.log(histories);
  useEffect(() => {
    dispatch(fetchHistory());
    dispatch(fetchBalance());
  }, []);
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
    Jost_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  const handleGoToNextPage = () => {
    navigation.navigate("getPaid");
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <View>
        <View className="border-b-3 shadow-md border-gray-800 py-[3vh]">
          <AppHeader />
        </View>
        <Text className="text-lg uppercase text-lime-700 font-[extraBold] text-center my-[2vh]">
          my contribution stats
        </Text>
        <View className="bg-white shadow-md -4 rounded-md my-[1vh] w-[40vw] mx-[30vw]">
          <Text className="uppercase font-[Jost_400Regular] text-gray-700 p-1 text-center text-xs">
            TOTAL Rewards: {balance?.data} RWF
          </Text>
        </View>
        <View className="h-[60vh]">
          {loader === "loading" && (
            <ActivityIndicator size="large" color="#00ff00" />
          )}
          <FlatList
            data={histories}
            renderItem={({ item }) => (
              <Table
                date={item.createdAt}
                contribution={item.numberOfRecyclables}
                reward={item.totalRewards}
                type={item.bootleType}
              />
            )}
            keyExtractor={(item) => item?.id}
          />
        </View>
        <View className="py-4">
          <CustomButton
            title="withdraw"
            text="font-[extraBold] text-sm capitalize text-white text-center"
            bgView="flex justify-center  bg-lime-600 focus:ring-1 border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
            onPress={handleGoToNextPage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Statistics;
