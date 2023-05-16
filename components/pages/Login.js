import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import CustomButton from "../buttons/Button";
const Login = () => {
  return (
    <View>
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
      <Text className="text-lime-600 font-semibold text-xl mb-[50%]">
        Login with Email and Password
      </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Formik
          initialValues={{ phoneNumber: "", password: "" }}
          onSubmit={(values, action) => {
            action.resetForm();
          }}
        >
          {(props) => (
            <View>
              <TextInput
                keyboardType="numeric"
                className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-full p-2 mb-[10%] placeholder:text-center"
                placeholder="Your phone number here"
                onChange={props.handleChange("phoneNumber")}
                values={props.values.phoneNumber}
              />
              <TextInput
                className="bg-gray-200 border border-gray-200 text-black  text-sm rounded-sm focus:border-lime-600 block w-full p-2 mb-[10%] placeholder:text-center"
                placeholder="Your password here"
                onChange={props.handleChange("password")}
                values={props.values.password}
                secureTextEntry={true}
              />
              <CustomButton
                title="Login"
                text="font-bold text-sm capitalize text-white text-center"
                bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4"
                onPress={props.handleSubmit}
              />
              <CustomButton
                title="create an account"
                text="font-bold text-sm capitalize text-black text-center"
                bgView="flex justify-center bg-gray-300 focus:ring-1 border-b-2 shadow-sm border-gray-400 dark:shadow-sm rounded-md py-2"
              />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default Login;
