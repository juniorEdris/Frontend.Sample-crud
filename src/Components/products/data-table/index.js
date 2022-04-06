import moment from "moment";
import { useState } from "react";
import UseGetData from "../../helper/useGetData";

const DataTable = ({categories}) => {
    const { data:allcategories =[] } = categories;
    const [data] = UseGetData('api/get-all-products');
    const { data:products } = data;

    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedProducts, setCheckedProducts] = useState([]);

    const handleCheckALL = () => {
        setCheckedAll(!checkedAll);
        if(!checkedAll){
            const allProductsId = products.map(({_id}) => _id);
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

    const deleteItems = () => {
        console.log({checkedAll, checkedProducts});
    }

    return ( 
        <>
            <div className="container mt-5 px-2">
            <div className="mb-2 d-flex justify-content-end align-items-center">
                <div className="px-2"> <span role="button" tabIndex="0" onClick={deleteItems} className="table-delete-btn text-red-600 underline hover:opacity-80">Delete</span></div>
            </div>
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
                        <th scope="col" className="text-end"><span>Available from</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(({_id, name, category_id, cat_name, price, status, available_since}) => (
                        <tr key={_id}>
                            <th scope="row"><span role="button" tabIndex="0" onClick={()=> handleCheckSingleProduct(_id)} className={`${checkedProducts.includes(_id) ? 'active' : '' } cursor-pointer product-checkbox`}/></th>
                            <td className="capitalize">{name}</td>
                            <td>{category_id}</td>
                            <td><span className="ms-1">{allcategories?.filter(({_id})=> _id ===category_id)[0]?.name ?? 'none'}</span></td>
                            <td>${price}</td>
                            <td>{status === true ? 'available' : 'unavailable'}</td>
                            <td className="text-end"><span className="fw-bolder"></span>{moment(available_since).format('MMMM Do YYYY')}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default DataTable;