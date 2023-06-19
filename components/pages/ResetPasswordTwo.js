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
import { useSelector } from "react-redux";
import { showPhonenumber } from "../../redux/passreset/passreset";
import toaster from "../contents/Toaster";
import { i18n } from "../contents/locale/translation";
const LoginSchema = yup.object({
  resetCode: yup.string().required(),
});
const DisplayResetCode = ({ navigation }) => {
  const PhoneNumber = useSelector(showPhonenumber);
  const [disabled,setDisabled] = useState(false);
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
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={loader ? "mt-[10vh] opacity-100" : ""}>
          <View className="bg-gray-800 h-[40vh] shadow-md">
            <Text className="text-white font-[semibold] text-3xl mt-[13vh] mb-[1vh] mx-auto w-[90vw] leading-10">
              Follow instructions to reset your password
            </Text>
          </View>
          {loader && <ActivityIndicator size="large" color="#00ff00" />}
          <Formik
            initialValues={{ resetCode: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, action) => {
              setLoader(true);
              setDisabled(true);
              FetchPostRequest("api/rvm/users/verifycode", {
                phoneNumber: PhoneNumber,
                resetCode: values.resetCode,
              })
                .then(async (result) => {
                  if (result?.status == "failed") {
                    await toaster(
                      "the reset key provided does not exist",
                      "orange"
                    );
                  }
                  navigation.replace("resetpassword");
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
                  Enter code sent in sms
                </Text>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-center placeholder:font-[regular] mx-[8vw]"
                  placeholder=""
                  onChangeText={props.handleChange("resetCode")}
                  onBlur={props.handleBlur("resetCode")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.resetCode && props.errors.resetCode}
                </Text>
                <CustomButton
                  title="continue"
                  disabled={disabled}
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-8 w-[80vw] mx-auto opacity:opacity-25"
                  onPress={props.handleSubmit}
                />
                <CustomButton
                  title="back"
                  disabled={disabled}
                  text="font-[extraBold] text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-gray-800 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-4 w-[80vw] mx-auto"
                  onPress={() => navigation.navigate("resetcode")}
                />
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default DisplayResetCode;
