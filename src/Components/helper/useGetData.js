import { useEffect, useState } from "react";
import { API, getUser } from "../../utils";

const UseGetData = (url) => {
    const [data, setData] = useState([]);

    useEffect(()=> {
        const getData = async () => {
            await API().get(`${url}`)
            .then(response=>{
                const { data } = response;
                setData(data);
            })
            .catch(err=>{
                console.log(err);
            });
    
        };
        if(getUser()) getData();
    },[url]);

    const refetch = async () => {
        await API().get(`${url}`)
        .then(response=>{
            const { data } = response;
            setData(data);
        })
        .catch(err=>{
            console.log(err);
        });

    };
    return [data, refetch];
}
 
export default UseGetData;