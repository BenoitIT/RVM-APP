import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Platform, NativeModules } from "react-native";
import { useDispatch } from "react-redux";
import {
  useFonts,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
import { getRVMzones, getRVMLocation } from "../../api_manger/location_Api";
import { setCurrentPage } from "../../redux/multisSteps/multiStepFormSlice";
import toaster from "../contents/Toaster";
import {
  saveLocation,
  saveZone,
} from "../../redux/multisSteps/RecyclablesData";

const { StatusBarManager } = NativeModules;
const Locations = () => {
  const [selected, setSelected] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [data, setData] = useState("");
  const [zoneData, setZoneData] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true);
    getRVMLocation().then((result) => {
      const res = result?.data?.data;
      const locations = res.map((obj, index) => {
        const { Location, ...rest } = obj;
        return {
          ...rest,
          key: index + 1,
          value: Location,
        };
      });
      setData(locations);
      setSelectedZone("");
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
  const handleSelectLocation = (val) => {
    setLoader(true);
    dispatch(saveLocation(val));
    getRVMzones(val).then((result) => {
      const zones = result?.data?.data;
      const zoneArray = zones.map((obj, index) => {
        const { zone, ...rest } = obj;
        return {
          ...rest,
          key: index + 1,
          value: zone,
        };
      });
      setZoneData(zoneArray);
    });
    setSelected(val);
    setLoader(false);
  };
  const handleSelectZone = (val) => {
    dispatch(saveZone(val));
    setSelectedZone(val);
  };
  const handleGoToNextPage = () => {
    if (!selected) return toaster("select location", "orange");
    if (!selectedZone) return toaster("select zone RVM is located", "orange");
    dispatch(setCurrentPage(2));
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
          <View className="border-b-3 shadow-md border-gray-800 mb-[7vh] py-[3vh]">
            <AppHeader />
          </View>
          <Text className="text-gray-500 font-[semibold] text-xl mb-[4vh] mx-[3vw] align-middle text-center">
            Join the recycling revolution and earn rewards for every plastic
            bottle you recycle with our reverse vending machine
          </Text>
          <Text className="text-lime-600 font-[semibold]  text-2xl mb-[2vh] text-center">
            select the nearest RVM by your location
          </Text>
          {loader && <ActivityIndicator size="small" color="#00ff00" />}
          <View className=" px-[10vw]">
            <Text className="text-gray-600 text-lg my-2 font-[medium]">Location</Text>
            <SelectList
              setSelected={handleSelectLocation}
              data={data}
              save="value"
              placeholder="select location"
            />
          </View>
          <View className=" px-[10vw]">
            <Text className="text-gray-600 text-lg my-2 font-[medium]">Zone</Text>
            <SelectList
              setSelected={handleSelectZone}
              data={zoneData}
              save="value"
              placeholder="select zone"
            />
          </View>
          <View className="py-8">
            <CustomButton
              title="Next"
              text="font-[extraBold] text-sm capitalize text-white text-center"
              bgView="flex justify-center  bg-lime-600 focus:ring-1 border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
              onPress={handleGoToNextPage}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Locations;
