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
import * as yup from "yup";
import { Formik } from "formik";
import {
  useFonts,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import CustomButton from "../buttons/Button";
import { FetchPostRequest } from "../../utitlis/NonAuthApis";
import toaster from "../contents/Toaster";
import { i18n } from "../contents/locale/translation";
const SignupSchema = yup.object({
  firstName: yup.string().required(),
  lastname: yup.string().required(),
  Nationality: yup.string().required(),
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
  email: yup.string(),
});
const SignUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);
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
        <View className="">
          <View className="bg-gray-800 h-[30vh] shadow-md">
            <Text className="text-white font-[semibold] text-2xl mt-[10vh] mb-[1vh] mx-auto w-[90vw] leading-10">
              {i18n.t("fillInfo")}
            </Text>
          </View>
          {loader && <ActivityIndicator size="large" color="#00ff00" />}
          <Formik
            initialValues={{
              firstName: "",
              lastname: "",
              Nationality: "",
              phoneNumber: "",
              password: "",
              email: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, action) => {
              setLoader(true);
              setDisabled(true);
              FetchPostRequest("api/rvm/users/register", {
                firstName: values.firstName,
                lastName: values.lastname,
                Nationality: values.Nationality,
                phoneNumber: values.phoneNumber,
                password: values.password,
                email: values.email,
              }).then((result) => {
                if (result?.status == "failed") {
                  toaster(result?.message, "orange");
                }
                if (result.data?.status == "success") {
                  navigation.replace("login");
                  toaster(i18n.t("accountCreated"), "green");
                }
                setLoader(false);
                setDisabled(false);
              });
              action.resetForm();
            }}
          >
            {(props) => (
              <View className="-mt-[5vh] bg-white rounded-3xl pt-[4vh]">
                <TextInput
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t("EnterLastName")}
                  onChangeText={props.handleChange("firstName")}
                  values={props.values.firstName}
                  onBlur={props.handleBlur("firstName")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.firstName && props.errors.firstName}
                </Text>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t("EnterLastName")}
                  onChangeText={props.handleChange("lastname")}
                  values={props.values.lastname}
                  onBlur={props.handleBlur("lastname")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.lastname && props.errors.lastname}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t("EnterPhone")}
                  onChangeText={props.handleChange("phoneNumber")}
                  values={props.values.phoneNumber}
                  onBlur={props.handleBlur("phoneNumber")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t("nationality")}
                  onChangeText={props.handleChange("Nationality")}
                  values={props.values.Nationality}
                  onBlur={props.handleBlur("Nationality")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.Nationality && props.errors.Nationality}
                </Text>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t("EnterEmail")}
                  onChangeText={props.handleChange("email")}
                  values={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.email && props.errors.email}
                </Text>
                <TextInput
                  className="bg-transparent border border-gray-500 text-black text-sm rounded-xl focus:border-lime-600 block w-5/6  p-2 mt-[2%] placeholder:text-xs placeholder:pl-[5vw] placeholder:font-[regular] mx-[8vw]"
                  placeholder={i18n.t("createPass")}
                  onChangeText={props.handleChange("password")}
                  values={props.values.password}
                  onBlur={props.handleBlur("password")}
                  secureTextEntry={true}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.password && props.errors.password}
                </Text>
                <CustomButton
                  title={i18n.t("register")}
                  disabled={disabled}
                  text="font-bold text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-gray-800 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-4 w-[80vw] mx-auto disabled:opacity-25"
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
export default SignUp;
