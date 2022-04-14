import { useState } from "react";
import { API } from "../../utils";

const UseMutateData = () => {
    const [response, setResponse] = useState({});

    const mutateData = async (url, data) => {
        await API().post(`${url}`,data)
        .then(response=>{
            const { data } = response;
            setResponse(data);
        })
        .catch(err=>{
            console.log(err);
        });
        
    };

    return [mutateData, response];
}
 
export default UseMutateData;