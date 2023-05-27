import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform, NativeModules } from "react-native";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
import toaster from "../contents/Toaster";
const { StatusBarManager } = NativeModules;
const GetPaid = () => {
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

  const handleCashTransfer = () => {
    if (!selected) return toaster("select where to recieve money", "orange");
  };
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
          <Text className="text-lime-600 font-medium text-2xl mb-[2vh] text-center">
            PAYMENT INFO
          </Text>
          <View className="mt-[3vh]">
            <Text className="text-center text-4xl font-extrabold capitalize">current balance</Text>
            <Text className="text-center text-3xl font-normal uppercase mt-[2vh]">2000 RWF</Text>
          </View>
          <View className=" px-[10vw]">
            <View>
            <Text className="text-gray-900 font-bold text-lg text-center my-4">Where do you want to get the cash?</Text>
            <SelectList
              setSelected={(val)=>setSelected(val)}
              data={data}
              save="value"
              placeholder="select where to recieve money"
            />
            </View>
            <View>
            <Text className="text-gray-600 font-normal text-lg text-left mt-4 mb-2">Enter amaunt of money</Text>
            <TextInput
                  keyboardType="numeric"
                  className="border border-gray-500 text-black text-sm rounded-md focus:border-lime-600 block w-full  p-1 placeholder:pl-[5vw]"
                  placeholder="Ex: 400"
                  onChangeText={()=>console.log('changed')}
                />
            </View>
            <View>
            <Text className="text-gray-600 font-normal text-lg text-left mt-2 mb-2">Enter Phone number</Text>
            <TextInput
                  keyboardType="numeric"
                  className="border border-gray-500 text-black text-sm rounded-md focus:border-lime-600 block w-full  p-1 placeholder:pl-[5vw]"
                  placeholder="Ex: 078378..."
                  onChangeText={()=>console.log('changed')}
                />
            </View>
          </View>
          <View className="py-8">
            <CustomButton
              title="Transfer"
              text="font-bold text-sm capitalize text-white text-center"
              bgView="flex justify-center  bg-lime-600 focus:ring-1 border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
              onPress={handleCashTransfer}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default GetPaid;
