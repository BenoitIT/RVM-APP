import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { Platform, NativeModules } from "react-native";
import {
  useFonts,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import CustomButton from "../buttons/Button";
import AppHeader from "../contents/AppHeader";
import { setCurrentPage } from "../../redux/multisSteps/multiStepFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { BarCodeScanner } from "expo-barcode-scanner";
import toaster from "../contents/Toaster";
import { RecordRecyclables } from "../../api_manger/Recycle_Api";
import {
  saveNumberOfRecyclables,
  getLocation,
  getZone,
  getBottleType,
} from "../../redux/multisSteps/RecyclablesData";
import { i18n } from "../contents/locale/translation";
const { StatusBarManager } = NativeModules;

const QrScanner = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [number, setNumber] = useState(0);
  const location = useSelector(getLocation);
  const zone = useSelector(getZone);
  const bottleType = useSelector(getBottleType);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    setLoader(false);
  }, []);
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
    semibold: Jost_700Bold,
    medium: Jost_500Medium,
    regular: Jost_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setNumber(parseInt(data));
    dispatch(saveNumberOfRecyclables(parseInt(data)));
    alert(`${data} battles got scanned!`);
  };

  if (hasPermission === null) {
    return (
      <Text className="my-[60%] mx-auto text-sm text-gray-800">
        Requesting for camera permission....
      </Text>
    );
  }
  if (hasPermission === false) {
    return (
      <SafeAreaView>
        <Text className="my-[60%] text-sm mx-auto text-gray-800">
          Access to Camera denied
        </Text>
        <CustomButton
          title="Access Camera"
          text="font-bold text-sm capitalize text-white text-center"
          bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-4 mx-[10vw]"
          onPress={() => getBarCodeScannerPermissions()}
        />
      </SafeAreaView>
    );
  }
  const handleSaveRecyclables = () => {
    if (!number) return toaster("please scan QR from RVM", "orange");
    if (!location || !zone || !bottleType)
      return toaster("some data are missing", "orange");
    setLoader(true);
    RecordRecyclables({
      Location: location,
      zone,
      bootleType: bottleType,
      numberOfRecyclables: number,
    }).then((result) => {
      if (result?.status == "failed") {
        toaster("something went wrong", "orange");
      }
      if (result?.data?.status == "success") {
        toaster(result?.data?.message, "green");
      }
      setLoader(false);
      navigation.navigate("stats");
      dispatch(setCurrentPage(1));
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <ScrollView>
        <View className="mt-[3vh]">
          <View className="border-b-3 shadow-md border-gray-800 mb-[5vh] py-[5vh]">
            <AppHeader />
          </View>
          <Text className="text-gray-600 font-[semibold]  text-2xl mb-[5vh] text-center leading-8 w-[95vw] mx-auto">
            {i18n.t("getMachineScan")}
          </Text>
          <View className=" px-[10vw]">
            <Text className="text-lime-600 text-sm my-2 text-center uppercase font-[medium]">
              {i18n.t("scanQr")}
            </Text>
            {loader && <ActivityIndicator size="large" color="#00ff00" />}
            <View className="rounded-md bg-white shadow-md shadow-slate-500">
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{
                  backgroundColor: "white",
                  height: 200,
                  width: 300,
                  marginLeft: 5,
                  marginBottom: 5,
                  marginTop: 5,
                }}
              />
              {scanned && (
                <Button
                  title={"Tap to Scan Again"}
                  onPress={() => setScanned(false)}
                  color="gray"
                />
              )}
            </View>
          </View>
          <CustomButton
            title={i18n.t("Redeem")}
            text="font-[extraBold] text-sm capitalize text-white text-center"
            bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md border-b-2 shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-md py-2 my-8 mx-[10vw]"
            onPress={handleSaveRecyclables}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default QrScanner;
