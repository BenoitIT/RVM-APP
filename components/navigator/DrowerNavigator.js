import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Recycle from "../pages/Recycle";
import Statistics from "../pages/Statistics";
import GetPaid from "../pages/GetPaid";
import Language from "../pages/Languages";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import CustomDrawer from "../contents/CustomDrower";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "gray",
        drawerActiveTintColor: "white",
        drawerStyle: {
          paddingTop: 10,
        },
      }}
      contentContainerStyle={{ paddingTop: 40 }}
    >
      <Drawer.Screen
        name="doRecyle"
        component={Recycle}
        options={{
          title: "CONTRIBUTE",
          drawerIcon: () => (
            <FontAwesome5 name="uncharted" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="viewStats"
        component={Statistics}
        options={{
          title: "STATISTICS",
          drawerIcon: () => (
            <FontAwesome name="line-chart" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="payment"
        component={GetPaid}
        options={{
          title: "GET PAID",
          drawerIcon: () => (
            <FontAwesome5 name="comment-dollar" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="map"
        component={Language}
        options={{
          title: "GET NEAR MACHINE",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="washing-machine"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        component={Language}
        options={{
          title: "ABOUT RVM",
          drawerIcon: () => <Foundation name="info" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="selectLang"
        component={Language}
        options={{
          title: "LANGUAGES",
          drawerIcon: () => (
            <FontAwesome name="language" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="logout"
        component={Language}
        options={{
          title: "LOGOUT",
          drawerIcon: () => (
            <SimpleLineIcons name="logout" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
