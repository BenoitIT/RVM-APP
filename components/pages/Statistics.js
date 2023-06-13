import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Platform, NativeModules } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  useFonts,
  Jost_800ExtraBold,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import {
  fetchBalance,
  selectBalance,
} from "../../redux/rewards/getBalanceSlice";
import Table from "../contents/Table";
import AppHeader from "../contents/AppHeader";
import CustomButton from "../buttons/Button";
import {
  fetchHistory,
  selectHistory,
  fetchStatus,
  fetchMessage,
  deleteHistory,
} from "../../redux/Contribution/GetContribution";
import toaster from "../contents/Toaster";
import { i18n } from "../contents/locale/translation";
import { showActiveLanguage } from "../../redux/locale/languagesSlice";

const { StatusBarManager } = NativeModules;
const Statistics = ({ navigation }) => {
  const dispatch = useDispatch();
  const histories = useSelector(selectHistory);
  const loader = useSelector(fetchStatus);
  const message = useSelector(fetchMessage);
  const balance = useSelector(selectBalance);
  const locale = useSelector(showActiveLanguage);
  useEffect(() => {
    dispatch(fetchHistory());
    dispatch(fetchBalance());
  }, [dispatch, locale]);
  let [fontsLoaded] = useFonts({
    extraBold: Jost_800ExtraBold,
    Jost_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  }
  if (message !== "") {
    toaster(i18n.t("deleteSuccess"), "green");
  }
  const handleGoToNextPage = () => {
    navigation.navigate("getPaid");
  };
  const VisibleItem = (props) => {
    return (
      <TouchableHighlight>
        <Table
          date={props.data.item.createdAt}
          contribution={props.data.item.numberOfRecyclables}
          reward={props.data.item.totalRewards}
          type={props.data.item.bootleType}
        />
      </TouchableHighlight>
    );
  };
  const renderItems = (data, rowMap) => {
    return <VisibleItem data={data} />;
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
   dispatch(deleteHistory(rowKey));
  };
  const HiddenItemWithActions = (props) => {
    const { Ondelete } = props;
    return (
      <View className="h-full w-4/4">
        <View className="flex flex-row items-end my-10 ml-6">
          <CustomButton
            title={i18n.t("delete")}
            text="font-medium text-xs capitalize text-white text-center"
            bgView="flex justify-center bg-red-600 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 rounded-2xl py-2 px-4"
            onPress={Ondelete}
          />
        </View>
      </View>
    );
  };
  const renderHiddenItems = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        itemKey={data.item.id}
        Onclose={() => closeRow(rowMap, data.item.id)}
        Ondelete={() => deleteRow(rowMap, data.item.id)}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
      }}
    >
      <View>
        <View className="border-b-3 shadow-md border-gray-800 py-[3vh]">
          <AppHeader />
        </View>
        <Text className="text-lg uppercase text-lime-700 font-[extraBold] text-center my-[1vh]">
          {i18n.t("mystats")}
        </Text>
        <View className="bg-white shadow-md -4 rounded-md my-[1vh] w-[40vw] mx-[30vw]">
          <Text className="uppercase font-[Jost_400Regular] text-gray-700 p-1 text-center text-xs">
            {i18n.t("totalReword")}: {balance?.data} RWF
          </Text>
        </View>
        <View className="h-[60vh]">
          {loader === "loading" && (
            <ActivityIndicator size="large" color="#00ff00" />
          )}
          <SwipeListView
            data={histories}
            renderItem={renderItems}
            renderHiddenItem={renderHiddenItems}
            leftOpenValue={75}
            rightOpenValue={-120}
          />
        </View>
        <View className="py-4">
          <CustomButton
            title={i18n.t("withdraw")}
            text="font-[extraBold] text-sm capitalize text-white text-center"
            bgView="flex justify-center  bg-lime-600 focus:ring-1 shadow-md  shadow-sm border-gray-300 shadow-gray-950 dark:shadow-sm rounded-full py-2 mt-2 w-[80vw] mx-auto"
            onPress={handleGoToNextPage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Statistics;
