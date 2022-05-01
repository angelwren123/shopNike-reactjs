import axios from "axios";

export default function callApi (endpoint, method='GET', body){
    return axios({
        method:method,
        url:`https://fake-api-json-angular-production-56a8.up.railway.app/${endpoint}`,
        data: body
    }).catch(err=>console.log(err))
}