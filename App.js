import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavStack from './components/navigator/navStack';
export default function App() {
  return (
    <NavigationContainer>
      <NavStack/>
    </NavigationContainer>
  );
}


