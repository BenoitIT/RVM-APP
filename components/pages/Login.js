import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { Platform, NativeModules } from "react-native";
const { StatusBarManager } = NativeModules;
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import CustomButton from "../buttons/Button";
import { userLogin } from "../../api_manger/user_Api";
import toaster from "../contents/Toaster";

const LoginSchema = yup.object({
  phoneNumber: yup
    .string()
    .required()
    .test(
      "is-valid-phone-number",
      "Phone number be 10 digits started with 0",
      (value) => {
        if (value) {
          const digitsOnly = value.replace(/\D/g, "");
          return digitsOnly.length === 10;
        }
        return false;
      }
    ),
  password: yup.string().required(),
});
const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={loader ? "mt-[10vh] opacity-75" : "mt-[10vh]"}>
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
          {loader && <ActivityIndicator size="large" color="#00ff00" />}
          <Formik
            initialValues={{ phoneNumber: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => {
              setLoader(true);
              userLogin({
                phoneNumber: values.phoneNumber,
                password: values.password,
              }).then((result) => {
                if (result?.status == "failed") {
                  toaster(result?.message, "orange");
                }
                if (result.data?.status == "success") {
                  AsyncStorage.setItem("accessToken", result.data.data);
                  navigation.replace("recycle");
                  toaster("login success! welcome", "green");
                }
                setLoader(false);
              });
              action.resetForm();
            }}
          >
            {(props) => (
              <View>
                <TextInput
                  keyboardType="numeric"
                  className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="Your phone number here"
                  onChangeText={props.handleChange("phoneNumber")}
                  onBlur={props.handleBlur("phoneNumber")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
                <TextInput
                  className="bg-gray-200 border border-gray-200 text-black  text-sm rounded-sm focus:border-lime-600 block w-5/6 p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="Your password here"
                  onChangeText={props.handleChange("password")}
                  values={props.values.password}
                  onBlur={props.handleBlur("password")}
                  secureTextEntry={true}
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
                  onPress={() => navigation.navigate("register")}
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
