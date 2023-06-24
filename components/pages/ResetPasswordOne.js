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
import { Formik } from "formik";
import CustomButton from "../buttons/Button";
import { FetchPostRequest } from "../../utitlis/NonAuthApis";
import toaster from "../contents/Toaster";
import { useDispatch } from "react-redux";
import { setPhoneNumber } from "../../redux/passreset/passreset";
import { i18n } from "../contents/locale/translation";
const PassResetSchema = yup.object({
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
});
const DisplayResetInput = ({ navigation }) => {
  const dispatch = useDispatch();
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
        <View>
          <View className="bg-gray-800 h-[40vh] shadow-md">
            <Text className="text-white font-[semibold] text-3xl mt-[13vh] mb-[1vh] mx-auto w-[90vw] leading-10">
              Follow instructions to reset your password
            </Text>
          </View>
          {loader && <ActivityIndicator size="large" color="#00ff00" />}
          <Formik
            initialValues={{ phoneNumber: "" }}
            validationSchema={PassResetSchema}
            onSubmit={(values, action) => {
              setLoader(true);
              setDisabled(true);
              FetchPostRequest("api/rvm/users/resetcode", {
                phoneNumber: values.phoneNumber,
              })
              .then(async (result) => {
                if (result?.status == "failed") {
                  await toaster(result?.message, "orange");
                }
                if (result.data?.status == "success") {
                  navigation.replace("resetcode");
                  await toaster("Enter reset keys sent in SMS", "green");
                }
                dispatch(setPhoneNumber(values.phoneNumber));
                setLoader(false);
                setDisabled(false);
                  action.resetForm();
                })
                .catch(() => toaster(i18n.t("checkConnections"), "orange"));
            }}
          >
            {(props) => (
              <View className="-mt-[8vh] bg-white rounded-3xl pt-[20vh]">
                <Text className="text-center text-base font-[medium] text-gray-600">
                  Enter your phone number
                </Text>
                <TextInput
                  keyboardType="numeric"
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-center placeholder:font-[regular] mx-[8vw]"
                  placeholder="your telephone number"
                  onChangeText={props.handleChange("phoneNumber")}
                  onBlur={props.handleBlur("phoneNumber")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
                <CustomButton
                  title="continue"
                  disabled={disabled}
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-8 w-[80vw] mx-auto disabled:opacity-25"
                  onPress={props.handleSubmit}
                />
                <CustomButton
                  title="back"
                  disabled={disabled}
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-gray-800 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-4 w-[80vw] mx-auto"
                  onPress={() => navigation.navigate("login")}
                />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default DisplayResetInput;
