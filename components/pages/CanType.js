import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform, NativeModules } from "react-native";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
import { setCurrentPage } from "../../redux/multisSteps/multiStepFormSlice";
import { useDispatch } from "react-redux";
import toaster from "../contents/Toaster";
const { StatusBarManager } = NativeModules;

const CanType = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "1", value: "plastic bottle" },
    { key: "2", value: "can" },
  ];
  const handleGoToNextPage = () => {
    if (!selected) return toaster("select the type of bottle", "orange");
    dispatch(setCurrentPage(1));
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
