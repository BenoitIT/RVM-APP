import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform, NativeModules } from "react-native";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
const { StatusBarManager } = NativeModules;

const Locations = () => {
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

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
          <Text className="text-gray-500 font-normal text-xl mb-[4vh] mx-[3vw] align-middle text-center">
            Join the recycling revolution and earn rewards for every plastic
            bottle you recycle with our reverse vending machine
          </Text>
          <Text className="text-lime-600 font-medium text-2xl mb-[5%] text-center">
            select the nearest RVM by your location
          </Text>
          <View className=" px-[10vw]">
            <Text className="text-gray-600 text-lg my-2">Location</Text>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              placeholder="select location"
            />
          </View>
          <View className=" px-[10vw]">
            <Text className="text-gray-600 text-lg my-2">Zone</Text>
            <SelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              placeholder="select zone"
            />
          </View>
          <View className="py-8">
            <CustomButton
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
export default Locations;
