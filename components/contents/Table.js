import React from "react";
import moment from "moment";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import {
  useFonts,
  Jost_700Bold,
  Jost_500Medium,
  Jost_400Regular,
} from "@expo-google-fonts/jost";
import { i18n } from "../contents/locale/translation";
const Table = ({ date, contribution, reward, type }) => {
  let [fontsLoaded] = useFonts({
    semibold: Jost_700Bold,
    medium: Jost_500Medium,
    regular: Jost_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <DataTable className="bg-green-50  shadow-md shadow-gray-500 rounded-md mx-[5vw] px-[2vw] w-[90vw] my-[0.5vh]">
      <DataTable.Row className="border-0">
        <DataTable.Cell className="-pr-10">
          <Text className="font-bold capitalize font-[semibold]">
            {i18n.t("date")}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell colSpan={2} className="-ml-20 font-[medium]">
          {moment(date).format("dddd HH[h]:mm A")}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row className="border-0">
        <DataTable.Cell className="w-[10vw]">
          <Text className="font-bold capitalize font-[semibold]">
            {i18n.t("Contribution")}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell colSpan={2} className="-ml-20 font-[medium]">
          {contribution > 1
            ? contribution + " " + type + "s"
            : contribution + " " + type}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row className="border-0">
        <DataTable.Cell className="w-[10vw]">
          <Text className="font-bold capitalize font-[semibold]">
            {i18n.t("Reward")}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell colSpan={2} className="-ml-20 font-[medium]">
          {reward} <Text className="ml-2 font-bold font-[semibold]">RWF</Text>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
export default Table;
