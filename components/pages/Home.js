import React from 'react';
import { Platform, NativeModules } from 'react-native';
import {  useFonts,Jost_800ExtraBold } from '@expo-google-fonts/jost';
const { StatusBarManager } = NativeModules;
import { View, Text ,SafeAreaView} from "react-native";
import RVMcontainer from "../contents/RVMcontainer";
import CustomButton from "../buttons/Button";

export const Home = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
      extraBold:Jost_800ExtraBold,
    });
  
    if (!fontsLoaded) {
      return null;
    }
  return (
    <SafeAreaView  style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
     }}>
    <View className="mt-[5vh]">
      <View className="text-center mb-[10%]">
        <Text  style={{ fontFamily: 'extraBold',fontSize: 35,textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.2)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2,opacity:50 }}>Welcome To</Text>
        <Text style={{ fontFamily: 'extraBold',fontSize: 28,textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1}, textShadowRadius: 2 }}>
          Reverse Vending Machine
        </Text>
        <Text style={{ fontSize: 28, fontFamily: 'extraBold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }}>App</Text>
      </View>
      <RVMcontainer />
      <View className="flex flex-col justify-center mx-[10%] mt-[10%]">
        <CustomButton
          title="Login"
          text="font-[extraBold] text-sm capitalize text-white text-center"
          bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4"
          onPress={() => navigation.navigate('login')}
        />
        <CustomButton
          title="continue with google"
          text="font-[extraBold] text-sm capitalize text-black text-center"
          bgView="flex justify-center bg-gray-300 focus:ring-1 border-b-2 shadow-sm border-gray-400 dark:shadow-sm rounded-md py-2"
        />
      </View>
    </View>
    </SafeAreaView>
  );
};
export default Home;
