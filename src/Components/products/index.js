import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../../utils";
import HandleProducts from "../handle-products";
import UseGetData from "../helper/useGetData";
import UseMutateData from "../helper/useMutateData";
import DataTable from "./data-table";

const Products = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        if(!getUser()){
            navigate('/login');
        }
    }, [navigate]);
    

    const [data] = UseGetData('api/get-category');
    const [mutateData] = UseMutateData();
    const addProduct = (data) => {
        try{
            const {name, status, available_from, category_id, price } = data;
            const mutationData = {
                    name,
                    status,
                    available_from,
                    category_id,
                    price 
                };
            mutateData(`api/add-product`, mutationData);
            window.location.reload();
            toast.success('Product added successfully!');
        }catch(e){
            console.log(e);
        }
    };
    return ( 
        <div className="product-page">
            <HandleProducts
                title={'Add new product'}
                btnText={'Add product'}
                handleSubmit={addProduct}
                categories={data}
             />
            <DataTable categories={data}/>
        </div>
     );
}
 
export default Products;