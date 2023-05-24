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
import { Platform, NativeModules } from "react-native";
import CustomButton from "../buttons/Button";
import { userRegister } from "../../api_manger/user_Api";
import toaster from "../contents/Toaster";

const { StatusBarManager } = NativeModules;
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="mt-[3vh]">
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.2)",
              textShadowOffset: { width: 1, height: 3 },
              textShadowRadius: 2,
              marginBottom: 25,
              marginTop: 10,
            }}
          >
            _RVM_
          </Text>
          <Text className="text-lime-600 font-semibold text-xl mb-[10%] ml-[10vw]">
            Fill Identifications Below To Register
          </Text>
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
              userRegister({
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
                  toaster("your account created successfully", "green");
                }
                setLoader(false);
              });
              action.resetForm();
            }}
          >
            {(props) => (
              <View>
                <TextInput
                  className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="Enter your First name"
                  onChangeText={props.handleChange("firstName")}
                  values={props.values.firstName}
                  onBlur={props.handleBlur("firstName")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.firstName && props.errors.firstName}
                </Text>
                <TextInput
                  className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="Enter your Last name"
                  onChangeText={props.handleChange("lastname")}
                  values={props.values.lastname}
                  onBlur={props.handleBlur("lastname")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.lastname && props.errors.lastname}
                </Text>
                <TextInput
                  keyboardType="numeric"
                  className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="Enter phone number "
                  onChangeText={props.handleChange("phoneNumber")}
                  values={props.values.phoneNumber}
                  onBlur={props.handleBlur("phoneNumber")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.phoneNumber && props.errors.phoneNumber}
                </Text>
                <TextInput
                  className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="Enter your Nationality"
                  onChangeText={props.handleChange("Nationality")}
                  values={props.values.Nationality}
                  onBlur={props.handleBlur("Nationality")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.Nationality && props.errors.Nationality}
                </Text>
                <TextInput
                  className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="Enter your email"
                  onChangeText={props.handleChange("email")}
                  values={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.email && props.errors.email}
                </Text>
                <TextInput
                  className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-5/6  p-2 mt-[3%] placeholder:text-center mx-[8vw]"
                  placeholder="create a password"
                  onChangeText={props.handleChange("password")}
                  values={props.values.password}
                  secureTextEntry={true}
                />
                <Text className="text-red-400 text-xs text-center  mt-2">
                  {props.touched.password && props.errors.password}
                </Text>
                <CustomButton
                  title="Register"
                  text="font-bold text-sm capitalize text-white text-center"
                  bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
                  onPress={props.handleSubmit}
                  onBlur={props.handleBlur("password")}
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
