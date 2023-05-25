import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  FlatList,
  Button,
} from "react-native";
import { Platform, NativeModules } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Swipeable from "react-native-swipeable";
import Table from "../contents/Table";
import AppHeader from "../contents/AppHeader";
import { LogBox } from "react-native";
import CustomButton from "../buttons/Button";
import {
  fetchHistory,
  selectHistory,
  fetchStatus,
} from "../../redux/Contribution/GetContribution";
const { StatusBarManager } = NativeModules;
const Statistics = () => {
  const dispatch = useDispatch();
  const histories = useSelector(selectHistory);
  const loader = useSelector(fetchStatus);
  useEffect(() => {
    dispatch(fetchHistory());
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  const leftContent = <Text>good!</Text>

  const rightButtons = [
    <View className="w-[20vw] my-[5vh]">
    <Button title="delete" color="red" onPress={()=>console.log('i was clicked')}/>
    </View>
  ] 

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <View>
        <View className="border-b-3 shadow-md border-gray-800 py-[5vh]">
          <AppHeader />
        </View>
        <Text className="text-lg uppercase text-lime-700 font-bold text-center my-[2vh]">
          my contribution stats
        </Text>
        <View className="h-[60vh]">
          {loader === "loading" && (
            <ActivityIndicator size="large" color="#00ff00" />
          )}
          <FlatList
            data={histories}
            renderItem={({ item }) => (
              <Swipeable
                leftContent={leftContent}
                rightButtons={rightButtons}
                useNativeDriver={true}
              >
                <Table
                  date={item.createdAt}
                  contribution={item.numberOfRecyclables}
                  reward={item.totalRewards}
                  type={item.bootleType}
                />
              </Swipeable>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View className="py-4">
          <CustomButton
            title="withdraw"
            text="font-bold text-sm capitalize text-white text-center"
            bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Statistics;
