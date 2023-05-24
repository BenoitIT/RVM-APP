import React from "react";
import moment from "moment";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
const Table = ({date,contribution,reward,type}) => {
  return (
    <DataTable className="bg-green-50  shadow-md shadow-gray-500 rounded-md mx-[5vw] px-[2vw] w-[90vw] my-[0.5vh]">
      <DataTable.Row className="border-0">
        <DataTable.Cell className="-pr-10">
          <Text className="font-bold capitalize">Date</Text>
        </DataTable.Cell>
        <DataTable.Cell colSpan={2} className="-ml-20">
          {moment(date).format("dddd HH[h]:mm A")
}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row className="border-0">
        <DataTable.Cell className="w-[10vw]">
          <Text className="font-bold capitalize">Contribution</Text>
        </DataTable.Cell>
        <DataTable.Cell colSpan={2} className="-ml-20">
         {contribution>1?contribution+' '+type+'s':contribution+' '+type}
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row className="border-0">
        <DataTable.Cell className="w-[10vw]">
          <Text className="font-bold capitalize">Reward</Text>
        </DataTable.Cell>
        <DataTable.Cell colSpan={2} className="-ml-20">
          {reward} <Text className="ml-2 font-bold">RWF</Text>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};
export default Table;
