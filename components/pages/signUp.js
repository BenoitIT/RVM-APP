import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import CustomButton from "../buttons/Button";
const SignupSchema = yup.object({
  firstName: yup.string().required(),
  lastname: yup.string().required(),
  Nationality: yup.string().required(),
  phoneNumber: yup.number().required().min(10),
  password: yup.string().required(),
  email: yup.string().required(),
});
const SignUp = () => {
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
          marginBottom: 20,
          marginTop: 20,
        }}
      >
        _RVM_
      </Text>
      <Text className="text-lime-600 font-semibold text-xl mb-[20%]">
        Fill Identifications Below To Register
      </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            action.resetForm();
          }}
        >
          {(props) => (
            <View>
              <TextInput
                className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-full p-2 mt-[3%] placeholder:text-center"
                placeholder="Enter your First name"
                onChange={props.handleChange("firstName")}
                values={props.values.firstName}
                onBlur={props.handleBlur("firstName")}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.firstName && props.errors.firstName}
              </Text>
              <TextInput
                className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-full p-2 mt-[3%] placeholder:text-center"
                placeholder="Enter your Last name"
                onChange={props.handleChange("lastname")}
                values={props.values.lastname}
                onBlur={props.handleBlur("lastname")}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.lastname && props.errors.lastname}
              </Text>
              <TextInput
                keyboardType="numeric"
                className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-full p-2 mt-[3%] placeholder:text-center"
                placeholder="Enter phone number "
                onChange={props.handleChange("phoneNumber")}
                values={props.values.phoneNumber}
                onBlur={props.handleBlur("phoneNumber")}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.phoneNumber && props.errors.phoneNumber}
              </Text>
              <TextInput
                className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-full p-2 mt-[3%] placeholder:text-center"
                placeholder="Enter your Nationality"
                onChange={props.handleChange("Nationality")}
                values={props.values.Nationality}
                onBlur={props.handleBlur("Nationality")}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.Nationality && props.errors.Nationality}
              </Text>
              <TextInput
                className="bg-gray-200 border border-gray-200 text-black text-sm rounded-sm focus:border-lime-600 block w-full p-2 mt-[3%] placeholder:text-center"
                placeholder="Enter your email"
                onChange={props.handleChange("email")}
                values={props.values.email}
                onBlur={props.handleBlur("email")}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.email && props.errors.email}
              </Text>
              <TextInput
                className="bg-gray-200 border border-gray-200 text-black  text-sm rounded-sm focus:border-lime-600 block w-full p-2 mt-[3%] placeholder:text-center"
                placeholder="create a password"
                onChange={props.handleChange("password")}
                values={props.values.password}
                secureTextEntry={true}
              />
              <Text className="text-red-400 text-xs text-center  mt-2">
                {props.touched.password && props.errors.password}
              </Text>
              <CustomButton
                title="Register"
                text="font-bold text-sm capitalize text-white text-center"
                bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-[3%]"
                onPress={props.handleSubmit}
                onBlur={props.handleBlur("password")}
              />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default SignUp;
