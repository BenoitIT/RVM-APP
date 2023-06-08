import React,{useState, useEffect} from "react";
import MapView from "react-native-maps";
import { View, StyleSheet,SafeAreaView,Button } from "react-native";
import { Platform, NativeModules } from "react-native";
import AppHeader from "../contents/AppHeader";
import * as Location from 'expo-location';
import toaster from "../contents/Toaster";
const { StatusBarManager } = NativeModules;
const RvmMap = () => {
  const [mapRegion,setMapRegion] =useState({
    latitude:-2.008,
    longitude:29.754,
    latitudeDelta:-2.008,
    langitudeDelta:29.754,
  });
  const userLocation =async ()=>{
    let {status}= await Location.getForegroundPermissionsAsync();
    if(status!=='granted'){
      return toaster("permission to access location denied", "orange");
    }
    let location= await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setMapRegion({
      latitude:location.coords.latitude,
      langitude:location.coords.longitude,
      latitudeDelta:-2.008,
      langitudeDelta:29.754
    })
    console.log(location.coords.latitude,location.coords.longitude);
  }
  useEffect(()=>{
    userLocation();
  },[])
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <View className="border-b-3 shadow-md border-gray-800 py-[3vh] -mt-4">
        <AppHeader />
      </View>
      <MapView style={styles.map} region={mapRegion}/>
      <Button title="get location" onPress={userLocation}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "90%",
  },
});
export default RvmMap;
