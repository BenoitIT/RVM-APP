import ApiManager from "./ApiManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const getBalance = async ()=>{
  try{
const token = await AsyncStorage.getItem("accessToken");
const result = await ApiManager('/api/rvm/getpaid/mybalance',{
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  },
});
return result;
  }
  catch(err){
      return err.response.data; 
  }
}