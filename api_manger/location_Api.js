import ApiManager from "./ApiManager";

export const getRVMzones = async location=>{
    try{
 const result = await ApiManager(`api/rvm/machines/${location}/zones`,{
    method: 'GET',
 });
 return result;
    }
    catch(err){
        return err.response.data; 
    }
}

export const getRVMLocation = async ()=>{
    try{
 const result = await ApiManager(`api/rvm/machines/locations`,{
    method: 'GET',
 });
 return result;
    }
    catch(err){
        return err.response.data; 
    }
}