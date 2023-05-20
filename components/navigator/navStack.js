import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import SignUp from '../pages/signUp';
import  Home  from '../pages/Home';
import Login from '../pages/Login';
import Locations from '../pages/locations';
import CanType from '../pages/CanType';

 const NavStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="bottleType" component={CanType}/>
        <Stack.Screen name="Address" component={Locations}/>
        <Stack.Screen name="home" component={Home}/>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={SignUp} />
      </Stack.Navigator>
    )
}
export default NavStack;