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
import { userLogin } from "../../api_manger/user_Api";
import toaster from "../contents/Toaster";
import { i18n } from "../contents/locale/translation";

const { StatusBarManager } = NativeModules;
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
              fontFamily: "extraBold",
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.2)",
              textShadowOffset: { width: 1, height: 3 },
              textShadowRadius: 2,
              marginBottom: 60,
            }}
          >
            _RVM_
          </Text>
          <Text className="text-lime-600 font-[semibold] text-xl mb-[5vh] mt-[5vh] mx-auto text-center w-[90vw]">
           {i18n.t('login_with_Pass')}
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
              })
                .then(async (result) => {
                  if (result?.status == "failed") {
                    toaster(result?.message, "orange");
                  }
                  if (result.data?.status == "success") {
                    await AsyncStorage.setItem("accessToken", result.data.data);
                    navigation.replace("recycle");
                    toaster(i18n.t("lognSuccess"), "green");
                  }
                  setLoader(false);
                })
                .catch((errors) => console.log(errors));
              action.resetForm();
            }}
          >
            {(props) => (
              <View>
                <Text className="text-center text-lg font-[medium] text-gray-600">
                {i18n.t('phoneNumber')}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-center placeholder:font-[regular] mx-[8vw]"
                  placeholder="078......../072....."
                  onChangeText={props.handleChange("phoneNumber")}
                  onBlur={props.handleBlur("phoneNumber")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
                <Text className="text-center text-lg font-[medium] text-gray-600 -mt-2">
                {i18n.t('password')}
                </Text>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black  text-sm rounded-sm focus:border-lime-600 block w-5/6 p-2 mt-[2%] placeholder:text-center placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t('pass')}
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
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-lime-600 focus:ring-1 border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
                  onPress={props.handleSubmit}
                />
                <CustomButton
                  title={i18n.t("createAccount")}
                  text="font-[extraBold] text-sm capitalize text-black text-center"
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
