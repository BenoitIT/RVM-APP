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
import {
  useFonts,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import CustomButton from "../buttons/Button";
import { FetchPostRequest } from "../../utitlis/NonAuthApis";
import toaster from "../contents/Toaster";
import { i18n } from "../contents/locale/translation";
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
  const [disabled,setDisabled] = useState(false);
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
    semibold: Jost_700Bold,
    medium: Jost_500Medium,
    regular: Jost_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={loader ? "mt-[10vh] opacity-100" : ""}>
          <View className="bg-gray-800 h-[40vh] shadow-md">
            <Text className="text-white font-[semibold] text-2xl mt-[15vh] mb-[1vh] mx-auto w-[90vw] leading-10">
              {i18n.t("login_with_Pass")}
            </Text>
          </View>
          {loader && <ActivityIndicator size="large" color="#00ff00" />}
          <Formik
            initialValues={{ phoneNumber: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => {
              setLoader(true);
              setDisabled(true);
              FetchPostRequest("api/rvm/users/login",{
                phoneNumber: values.phoneNumber,
                password: values.password,
              })
                .then(async (result) => {
                  if (result?.status == "failed") {
                    await toaster(result?.message, "orange");
                  }
                  if (result.data?.status == "success") {
                    await AsyncStorage.setItem("accessToken", result.data.data);
                    navigation.replace("recycle");
                    await toaster(i18n.t("lognSuccess"), "green");
                  }
                  setLoader(false);
                  setDisabled(false);
                  action.resetForm();
                })
                .catch(() => toaster(i18n.t("checkConnections"), "orange"));
            }}
          >
            {(props) => (
              <View className="pt-[10vh] -mt-[8vh] bg-white rounded-3xl">
                <View className="bg-white mx-[14vw] -mb-[2.3vh] z-10 w-[40vw]">
                  <Text className="text-base font-[regular] text-gray-600 text-center">
                    {i18n.t("phoneNumber")}
                  </Text>
                </View>
                <TextInput
                  keyboardType="numeric"
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-2xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder="078......../072....."
                  onChangeText={props.handleChange("phoneNumber")}
                  onBlur={props.handleBlur("phoneNumber")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
                <View className="bg-white mx-[14vw] -mb-[2.3vh] z-10 w-[25vw]">
                  <Text className=" text-base font-[regular] text-gray-600 -mt-2 text-center">
                    {i18n.t("password")}
                  </Text>
                </View>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black  text-sm rounded-2xl focus:border-lime-600 block w-5/6 p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t("pass")}
                  onChangeText={props.handleChange("password")}
                  values={props.values.password}
                  onBlur={props.handleBlur("password")}
                  secureTextEntry={true}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.password && props.errors.password}
                </Text>
                <CustomButton
                  title={i18n.t("login")}
                  disabled={disabled}
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-8 w-[80vw] mx-auto disabled:opacity-25"
                  onPress={props.handleSubmit}
                />
                <CustomButton
                  title={i18n.t("reset")}
                  disabled={disabled}
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-gray-800 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-4 w-[80vw] mx-auto"
                  onPress={()=>navigation.navigate("resetInput")}
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
