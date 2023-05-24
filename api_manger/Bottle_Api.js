import ApiManager from "./ApiManager";
export const getAllowedBottles = async ()=>{
    try{
 const result = await ApiManager('api/rvm/recycle/rewards/list',{
    method: 'GET',
 });
 return result;
    }
    catch(err){
        return err.response.data; 
    }
}