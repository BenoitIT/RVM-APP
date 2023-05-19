import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './components/pages/signUp';
import  Home  from './components/pages/Home';
import Login from './components/pages/Login';
export default function App() {

const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}


