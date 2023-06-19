import axios from 'axios';

const ApiManager=axios.create({
  baseURL:"https://spotless-bell-bottoms-ox.cyclic.app/",
  responseType:"json",
  withCredentials:true,
});
export default ApiManager;