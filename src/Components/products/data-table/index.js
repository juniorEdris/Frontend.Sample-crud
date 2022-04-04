import { useState } from "react";

const DataTable = () => {

    const data = [
        {
            id: '#rwid147',
            name: 'Microwave',
            cat_id: '#rwid147',
            cat_name: 'Kitchen',
            price: '$0.99',
            status: 'On sale',
            available_from: '02-04-22',
        },
        {
            id: '#rwid149',
            name: 'Rice cooker',
            cat_id: '#rwid149',
            cat_name: 'Kitchen',
            price: '$0.75',
            status: 'On sale',
            available_from: '02-03-22',
        }
    ];

    const [checkedAll, setCheckedAll] = useState(false);
    const [checkedProducts, setCheckedProducts] = useState([]);

    const handleCheckALL = () => {
        setCheckedAll(!checkedAll);
        if(!checkedAll){
            const allProductsId = data.map(({id}) => id);
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
            <div class="mb-2 d-flex justify-content-end align-items-center">
                <div class="px-2"> <span role="button" tabIndex="0" onClick={deleteItems} className="table-delete-btn text-red-600 underline hover:opacity-80">Delete</span></div>
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
                        {data.map(({id, name, cat_id, cat_name, price, status, available_from}) => (<tr>
                            <th key={id} scope="row"><span role="button" tabIndex="0" onClick={()=> handleCheckSingleProduct(id)} className={`${checkedProducts.includes(id) ? 'active' : '' } cursor-pointer product-checkbox`}/></th>
                            <td>{name}</td>
                            <td>{cat_id}</td>
                            <td><span className="ms-1">{cat_name}</span></td>
                            <td>{price}</td>
                            <td>{status}</td>
                            <td className="text-end"><span className="fw-bolder"></span>{available_from}</td>
                        </tr>))}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default DataTable;