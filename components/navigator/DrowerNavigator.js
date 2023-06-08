import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Recycle from "../pages/Recycle";
import Statistics from "../pages/Statistics";
import GetPaid from "../pages/GetPaid";
import Language from "../pages/Languages";
import DashLanguages from "../contents/dashLanguages";
import RvmMap from "../pages/map";
import Logout from "../pages/Logout";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { i18n } from "../contents/locale/translation";
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
          title: i18n.t("contribute"),
          drawerIcon: () => (
            <FontAwesome5 name="uncharted" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="viewStats"
        component={Statistics}
        options={{
          title: i18n.t("statistics"),
          drawerIcon: () => (
            <FontAwesome name="line-chart" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="payment"
        component={GetPaid}
        options={{
          title: i18n.t("getpaid"),
          drawerIcon: () => (
            <FontAwesome5 name="comment-dollar" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="map"
        component={RvmMap}
        options={{
          title:i18n.t("getMachine"),
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
          title: i18n.t("about"),
          drawerIcon: () => <Foundation name="info" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="selectLang"
        component={DashLanguages}
        options={{
          title: i18n.t("languages"),
          drawerIcon: () => (
            <FontAwesome name="language" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="logout"
        component={Logout}
        options={{
          title: i18n.t("logout"),
          drawerIcon: () => (
            <SimpleLineIcons name="logout" size={24} color="black" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
