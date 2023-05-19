import React from 'react';
import { SafeAreaView, View } from 'react-native';
import SignUp from './components/pages/signUp';
import  Home  from './components/pages/Home';
import Login from './components/pages/Login';
export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center item-center">
    <View>
     <SignUp/>
    </View>
    </SafeAreaView>
  );
}


