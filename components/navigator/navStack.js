import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignUp from "../pages/signUp";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Recycle from "../pages/Recycle";
import Statistics from "../pages/Statistics";

const NavStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={SignUp} />
      <Stack.Screen name="recycle" component={Recycle} />
      <Stack.Screen name="stats" component={Statistics} />
    </Stack.Navigator>
  );
};
export default NavStack;
