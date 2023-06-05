import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavStack from './components/navigator/navStack';
import { store } from './redux/store';
import { Provider } from "react-redux";
import { RootSiblingParent } from 'react-native-root-siblings';
export default function App() {
  return (
    <Provider store={store}>
    <RootSiblingParent>
    <NavigationContainer>
      <NavStack/>
    </NavigationContainer>
    </RootSiblingParent>
    </Provider>
  );
}


