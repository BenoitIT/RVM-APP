import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import SignUp from '../pages/signUp';
import  Home  from '../pages/Home';
import Login from '../pages/Login';

 const NavStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={SignUp} />
      </Stack.Navigator>
    )
}
export default NavStack;