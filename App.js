import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavStack from './components/navigator/navStack';
import { store } from './redux/store';
import { Provider } from "react-redux";
export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <NavStack/>
    </NavigationContainer>
    </Provider>
  );
}


