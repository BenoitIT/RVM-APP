import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Recycle from "../pages/Recycle";
import Statistics from "../pages/Statistics";
const Drawer = createDrawerNavigator();

export default function Drower() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="recycle">
        <Drawer.Screen name="recycle" component={Recycle} />
        <Drawer.Screen name="stats" component={Statistics} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}