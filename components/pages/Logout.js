import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Logout = ({ navigation }) => {
  useEffect(() => {
    const handleRemoveToken = async () => {
      await AsyncStorage.removeItem("accessToken");
    };

    handleRemoveToken();
    navigation.navigate("home");
  }, [navigation]);

  return null; 
};

export default Logout;

