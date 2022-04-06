import axios from "axios";
import { useEffect, useState } from "react";

const UseGetData = (url) => {
    const [data, setData] = useState([]);
    const domain = 'http://localhost:5000/';
    useEffect(()=> {
        const getData = async () => {
            await axios.get(`${domain}${url}`)
            .then(response=>{
                const { data } = response;
                setData(data);
            })
            .catch(err=>{
                console.log(err);
            });
    
        };
        getData();
    },[url]);

    const refetch = async () => {
        await axios.get(`${domain}${url}`)
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