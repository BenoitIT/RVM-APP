import React from 'react'
import {Text,View} from 'react-native';
import { DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import { useFonts, Jost_800ExtraBold } from "@expo-google-fonts/jost";
const CustomDrawer =(props)=>{
    let [fontsLoaded] = useFonts({
        extraBold: Jost_800ExtraBold,
      });
    
      if (!fontsLoaded) {
        return null;
      }
    return (
    <DrawerContentScrollView {...props}>
         <Text
            style={{
              fontSize: 25,
              fontFamily: "extraBold",
              textAlign: "center",
              marginLeft:-45,
              textShadowColor: "rgba(0, 0, 0, 0.2)",
              textShadowOffset: { width: 1, height: 3 },
              textShadowRadius: 2,
              marginBottom: 40,
            }}
          >
            _RVM_
          </Text>
      <View>
        <DrawerItemList {...props} />
      </View>
      </DrawerContentScrollView>
    )
}

export default CustomDrawer
