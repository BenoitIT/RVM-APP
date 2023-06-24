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
import { Formik } from "formik";
import CustomButton from "../buttons/Button";
import { useSelector } from "react-redux";
import { showPhonenumber } from "../../redux/passreset/passreset";
import { FetchPostRequest } from "../../utitlis/NonAuthApis";
import toaster from "../contents/Toaster";
import { i18n } from "../contents/locale/translation";

const LoginSchema = yup.object({
  password: yup
    .string()
    .required()
});
const DisplayResetPassword = ({ navigation }) => {
  const PhoneNumber = useSelector(showPhonenumber);
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
    <SafeAreaView
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={loader ? "opacity-100" : ""}>
        <View className="bg-gray-800 h-[40vh] shadow-md">
            <Text className="text-white font-[semibold] text-3xl mt-[13vh] mb-[1vh] mx-auto w-[90vw] leading-10">
            Follow instructions to reset your password
            </Text>
          </View>
          {loader && <ActivityIndicator size="large" color="#00ff00" />}
          <Formik
            initialValues={{ password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => {
              setLoader(true);
              setDisabled(true);
              FetchPostRequest("api/rvm/users/reset", {
                phoneNumber: PhoneNumber,
                newPassword: values.password,
              })
                .then(async (result) => {
                  if (result?.status == "failed") {
                    await toaster(result?.message, "orange");
                  }
                  if (result.data?.status == "success") {
                    navigation.replace("login");
                    await toaster("password is created successfully", "green");
                  }
                  setLoader(false);
                  setDisabled(false);
                })
                .catch(() => toaster(i18n.t("checkConnections"), "orange"));
              action.resetForm();
            }}
          >
            {(props) => (
              <View className="-mt-[8vh] bg-white rounded-3xl pt-[20vh]">
                <Text className="text-center text-base font-[medium] text-gray-600">
                  Enter your new password
                </Text>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-center placeholder:font-[regular] mx-[8vw]"
                  placeholder=""
                  onChangeText={props.handleChange("password")}
                  onBlur={props.handleBlur("password")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.password && props.errors.password}
                </Text>
                <CustomButton
                  title="create Password"
                  disabled={disabled}
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-gray-800 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-10 w-[80vw] mx-auto disabled:opacity-25"
                  onPress={props.handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default DisplayResetPassword;
