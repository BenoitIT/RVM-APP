import React from 'react';
import { View, Text } from "react-native";
import RVMcontainer from "../contents/RVMcontainer";
import CustomButton from "../buttons/Button";
export const Home = ({ navigation }) => {
  return (
    <View>
      <View className="text-center mb-[10%]">
        <Text  style={{ fontSize: 30,fontWeight: 'bold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.2)', textShadowOffset: { width: 1, height: 1.5 }, textShadowRadius: 2,opacity:50 }}>Welcome To</Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1.5}, textShadowRadius: 2 }}>
          Reverse Vending Machine
        </Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1.5 }, textShadowRadius: 2 }}>App</Text>
      </View>
      <RVMcontainer />
      <View className="flex flex-col justify-center mx-[10%] mt-[10%]">
        <CustomButton
          title="Login"
          text="font-bold text-sm capitalize text-white text-center"
          bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4"
          onPress={() => navigation.navigate('login')}
        />
        <CustomButton
          title="continue with google"
          text="font-bold text-sm capitalize text-black text-center"
          bgView="flex justify-center bg-gray-300 focus:ring-1 border-b-2 shadow-sm border-gray-400 dark:shadow-sm rounded-md py-2"
        />
      </View>
    </View>
  );
};
export default Home;
