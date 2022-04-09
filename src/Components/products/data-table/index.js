import axios from "axios";
import { size } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Trash2 } from "react-feather";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingComponent } from "../../../utils";

const DataTable = ({categories}) => {
    const { data:allcategories =[] } = categories;

    const [loading, setLoading] = useState(false);
    const [allroducts, setAllproducts] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedProducts, setCheckedProducts] = useState([]);

    const handleCheckALL = () => {
        setCheckedAll(!checkedAll);
        if(!checkedAll){
            const allProductsId = allroducts.map(({_id}) => _id);
            setCheckedProducts(allProductsId);
        }else{
            setCheckedProducts([]);
        }
    };
    
    const handleCheckSingleProduct = (id) => {
        if(checkedAll){
            setCheckedProducts([id]);
            setCheckedAll(false);
        }else{
            if(checkedProducts.includes(id)){
                const restOfIDs = checkedProducts.filter((product)=> product.id === id);
                setCheckedProducts(restOfIDs);
            }else{
                setCheckedProducts([...checkedProducts, id]);
            }
        }
    };

    const deleteMultipleItems = async () => {
        if(!size(checkedProducts)){
            toast.error('select atleast one product to delete!');
        }else{
            try {
                const {data} = await axios.delete(`http://localhost:5000/api/delete-multiple-products`, {data: {ids: checkedProducts}});
                if(data){
                    toast.success(data.message);
                    setLoading(false);
                    window.location.reload();
                }
            } catch (error) {
                setLoading(false);
                toast.error('Something went wrong!');
                console.log(error);
            }
        };
    }
    
    const deletesingleItem = async (id) => {
        setLoading(true);
        try {
            const {data} = await axios.post(`http://localhost:5000/api/delete-single-product/${id}`);
            if(data){
                toast.success(data.message);
                setLoading(false);
                const restProducts =  allroducts.filter((product)=> product._id !== id);
                setAllproducts(restProducts);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error('Something went wrong!');
        }
    };
    
    useEffect(() => {
        const fetchData = async () =>{
            await axios.get(`http://localhost:5000/api/get-all-products`)
            .then(response=>{
                const { data } = response;
                 const {data: products} = data;
                 setAllproducts(products);
            })
            .catch(err=>{
                console.log(err);
            });
        };
        fetchData();
    }, [loading])

    useEffect(() => {
        setLoading(true);
        if(size(allroducts)){
            setLoading(false);
        }
    }, [allroducts])
    return ( 
        <>
            {!size(allroducts) ? <div className="col-12 flex justify-content-center align-items-center text-3xl text-slate-700">No products</div> 
            :
            <div className="container mt-5 px-2">
            <div className="mb-2 d-flex justify-content-end align-items-center">
                <div className=""> <span role="button" tabIndex="0" onClick={deleteMultipleItems} className="table-delete-btn text-red-600 underline hover:opacity-80">Delete selected</span></div>
            </div>
                {loading ? LoadingComponent() :
                <div className="table-responsive">
                    <table className="table table-responsive table-borderless">
                    <thead>
                        <tr className="bg-light">
                        <th scope="col"><span role="button" tabIndex="0" onClick={()=> handleCheckALL()} className={`${checkedAll ? 'active' : '' } cursor-pointer product-checkbox`}/></th>
                        <th scope="col">Product name</th>
                        <th scope="col">Category ID</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Status</th>
                        <th scope="col"><span>Available from</span></th>
                        <th scope="col" className=""><span>Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                       allroducts?.map(({_id, name, category_id, price, status, available_since}) => (
                        <tr key={_id}>
                            <th scope="row"><span role="button" tabIndex="0" onClick={()=> handleCheckSingleProduct(_id)} className={`${checkedProducts.includes(_id) ? 'active' : '' } cursor-pointer product-checkbox`}/></th>
                            <td className="capitalize"><Link to={`${_id}`}>{name}</Link></td>
                            <td>{category_id}</td>
                            <td><span className="ms-1">{allcategories?.filter(({_id})=> _id ===category_id)[0]?.name ?? 'none'}</span></td>
                            <td>${price}</td>
                            <td className="capitalize">{status}</td>
                            <td><span className="fw-bolder"></span>{moment(available_since).format('L')}</td>
                            <td className=""> <span role="button" tabIndex="0" onClick={() => deletesingleItem(_id)} className="table-delete-btn text-red-600 hover:opacity-80"><Trash2/></span></td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>}
            </div>}
        </>
     );
}
 
export default DataTable;