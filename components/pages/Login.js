import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView
} from "react-native";
import { Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
import * as yup from "yup";
import { Formik } from "formik";
import CustomButton from "../buttons/Button";
const LoginSchema = yup.object({
  phoneNumber: yup.number().required().min(10),
  password: yup.string().required(),
});
const Login = ({navigation}) => {
  return (
    <SafeAreaView  style={{ 
      flex: 1, 
      paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
     }} >
     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View className="mt-[10vh]">
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          textShadowColor: "rgba(0, 0, 0, 0.2)",
          textShadowOffset: { width: 1, height: 3 },
          textShadowRadius: 2,
          marginBottom: 60,
        }}
      >
        _RVM_
      </Text>
      <Text className="text-lime-600 font-semibold text-xl mb-[25%] ml-[13vw]">
        Login with Email and Password
      </Text>
        <Formik
          initialValues={{ phoneNumber: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values, action) => {
            action.resetForm();
          }}
        >
          {(props) => (
            <View>
              <TextInput
                keyboardType="numeric"
                className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                placeholder="Your phone number here"
                onChange={props.handleChange("phoneNumber")}
                onBlur={props.handleBlur("phoneNumber")}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.phoneNumber && props.errors.phoneNumber}
              </Text>
              <TextInput
                className="bg-gray-200 border border-gray-200 text-black  text-sm rounded-sm focus:border-lime-600 block w-5/6 p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                placeholder="Your password here"
                onChange={props.handleChange("password")}
                values={props.values.password}
                onBlur={props.handleBlur("password")}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.password && props.errors.password}
              </Text>
              <CustomButton
                title="Login"
                text="font-bold text-sm capitalize text-white text-center"
                bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
                onPress={props.handleSubmit}
              />
              <CustomButton
                title="create an account"
                text="font-bold text-sm capitalize text-black text-center"
                bgView="flex justify-center bg-gray-300 focus:ring-1 border-b-2 shadow-sm border-gray-400 dark:shadow-sm rounded-md py-2 mx-[10vw]"
                onPress={() => navigation.navigate('register')}
              />
            </View>
          )}
        </Formik>
    </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default Login;
