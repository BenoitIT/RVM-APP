import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform, NativeModules } from "react-native";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
import { setCurrentPage } from "../../redux/multisSteps/multiStepFormSlice";
import { getAllowedBottles } from "../../api_manger/Bottle_Api";
import { useDispatch } from "react-redux";
import toaster from "../contents/Toaster";
import { saveBottleType } from "../../redux/multisSteps/RecyclablesData";
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
  const handleGoToNextPage = () => {
    if (!selected) return toaster("select the type of bottle", "orange");
    dispatch(saveBottleType(selected))
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
          <View className="border-b-3 shadow-md border-gray-800 mb-[5vh] py-[5vh]">
            <AppHeader />
          </View>
          <Text className="text-gray-800 font-medium text-2xl mb-[5vh] text-center">
            get the reverse vending machine and throw the used beverage
            containers
          </Text>
          <View className=" px-[10vw]">
            <Text className="text-gray-600 text-lg my-2">
              select the type of recyclable
            </Text>
            {loader && <ActivityIndicator size="small" color="#00ff00" />}
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              placeholder="select the type of bottle"
            />
          </View>
          <View className="py-20">
            <CustomButton
              onPress={handleGoToNextPage}
              title="Next"
              text="font-bold text-sm capitalize text-white text-center"
              bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CanType;
