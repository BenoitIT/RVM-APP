import ApiManager from "./ApiManager";

export const userLogin = async data=>{
    try{
 const result = await ApiManager('api/rvm/users/login',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    data:data,
 });
 return result;
    }
    catch(err){
        return err.response.data; 
    }
}

export const userRegister = async data=>{
    try{
 const result = await ApiManager('api/rvm/users/register',{
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    data:data,
 });
 return result;
    }
    catch(err){
        return err.response.data; 
    }
}