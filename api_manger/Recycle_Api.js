
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiManager from "./ApiManager";
export const RecordRecyclables = async (data) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    const result = await ApiManager('/api/rvm/recycle/recyclables/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: data,
    });
    return result;
  } catch (err) {
    return err.response?.data;
  }
};
