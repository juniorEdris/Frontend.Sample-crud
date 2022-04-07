import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../../utils";
import UseGetData from "../../helper/useGetData";
import UpdateProducts from "../../update-form";

const ProductDetails = () => {
    const { productid } = useParams();

    const [data] = UseGetData('api/get-category');
    
    const [details, setDetails] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!getUser()){
            navigate('/login');
        }
    }, [navigate]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get-single-product/${productid}`)
        .then(response => {
            const { data } = response?.data;
            if(!data.status){
                setError('Could not find the product!');
            }
            setDetails(data);
        })
        .catch(error=>{
            console.log(error);
        });
    }, [productid]);

    const handleSubmit = async (data) => {
        console.log({data});
        try{
            const response = await axios.post(`http://localhost:5000/api/update-single-product/${productid}`, data);
            console.log({response})
        }catch(err){
            console.error(err);
        }
    }
    return ( 
        <div className="container mt-5 px-2">
            <h1>Details { productid }</h1>
            <div className="mb-3">
                <span className="text-3xl">{error && error}</span>
                {details.name}
            </div>
            <UpdateProducts
                details={details} 
                handleSubmit={handleSubmit}
                categories={data}
            />
        </div>
     );
}
 
export default ProductDetails;