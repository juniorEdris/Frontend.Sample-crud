import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser, LoadingComponent } from "../../../utils";
import UseGetData from "../../helper/useGetData";
import UpdateProducts from "../../update-form";

const ProductDetails = () => {
    const { productid } = useParams();

    const [data] = UseGetData('api/get-category');
    
    const [details, setDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!getUser()){
            navigate('/login');
        }
    }, [navigate]);

    useEffect(()=>{
        setLoading(true);
        axios.get(`http://localhost:5000/api/get-single-product/${productid}`)
        .then(response => {
            const { data } = response?.data;
            if(!data.status){
                toast.error('Could not find the product!');
                setLoading(false);
            }else{
                setLoading(false);
                setDetails(data);
            }
        })
        .catch(error=>{
            console.log(error);
            toast.error('Could not find the product!');
        });
    }, [productid]);

    const handleSubmit = async (data) => {
        try{
            const response = await axios.post(`http://localhost:5000/api/update-single-product/${productid}`, data);
            const { data: res } = response;
            if (!res?.status) {
                toast.error(res.message);
            }else{
                toast.success(res.message);
            }
        }catch(err){
            toast.error("Something went wrong!");
            console.error(err);
        }
    }
    return ( 
        <div className="container mt-5 px-2">
            {
                loading ? LoadingComponent() : <UpdateProducts details={details} handleSubmit={handleSubmit} categories={data} />
            }
        </div>
     );
}
 
export default ProductDetails;