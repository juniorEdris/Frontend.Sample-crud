import axios from "axios";
import { useState } from "react";

const UseMutateData = () => {
    const [response, setResponse] = useState({});
    const domain = 'http://localhost:5000/';
    const mutateData = async (url, data) => {
        await axios.post(`${domain}${url}`,data)
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