import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignUp from "../pages/signUp";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Recycle from "../pages/Recycle";
import Statistics from "../pages/Statistics";
import GetPaid from "../pages/GetPaid";
import Language from "../pages/Languages";
import DrawerNavigator from "./DrowerNavigator";
import DisplayResetInput from "../pages/ResetPasswordOne";
import DisplayResetCode from "../pages/ResetPasswordTwo";
import DisplayResetPassword from "../pages/ResetPassword";
const NavStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="language" component={Language} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={SignUp} />
      <Stack.Screen name="resetcode" component={DisplayResetCode} />
      <Stack.Screen name="resetpassword" component={DisplayResetPassword} />
      <Stack.Screen name="resetInput" component={DisplayResetInput} />
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="stats" component={Statistics} />
      <Stack.Screen name="recycle" component={DrawerNavigator} />
      <Stack.Screen name="getPaid" component={GetPaid} />
    </Stack.Navigator>
  );
};
export default NavStack;
