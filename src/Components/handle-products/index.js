import { useState } from "react";
import { toast } from "react-toastify";
import { btnLoading } from "../../utils";
import Container from "../container";
import { statusData } from "../helper/uiData";

const HandleProducts = ({ title, btnText, handleSubmit, categories }) => {
    const { data:allcategories =[] } = categories;
    
    const [loading, setLoading] = useState(false);
    const [productInfo, setProductInfo] = useState({
        productName: '',
        productPrice: '',
        availableFrom: '',
        productStatus: '',
        productCategory:''
    });
    const formFilled = productInfo.productName && productInfo.productPrice && productInfo.availableFrom && productInfo.productStatus && productInfo.productCategory

    const handleChange = (e) => {
        setProductInfo({
            ...productInfo,
            [e.target.id]: e.target.value
        });
    };

    const submitData = (e) => {
        e.preventDefault();
        setLoading(true);
        if(!formFilled){
            setLoading(false);
            toast.error('Fill the required inputs!');
        }else{
            handleSubmit({
                name: productInfo.productName,
                price: productInfo.productPrice,
                available_from: productInfo.availableFrom,
                status: productInfo.productStatus,
                category_id: productInfo.productCategory,
            })
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };
    return (
        <Container>
            <div className="py-4 w-full">
                <h4 className="py-2 text-xl">{title ?? 'Update Product'}</h4>
                <form className="row g-3" onSubmit={submitData}>
                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="productName" placeholder="Name" onChange={handleChange} value={productInfo.productName} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="productPrice" className="form-label">Price</label>
                        <input type="text" className="form-control" id="productPrice" placeholder="Price" onChange={handleChange} value={productInfo.productPrice} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="availableFrom" className="form-label">Available from</label>
                        <input type="date" className="form-control" id="availableFrom" placeholder="Available from" onChange={handleChange} value={productInfo.availableFrom} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="productStatus" className="form-label">Status</label>
                        <select id="productStatus" className="form-select" onChange={handleChange} value={productInfo.productStatus}>
                        <option selected value=''>Choose...</option>
                        {
                            statusData.map(status=>(
                                <option key={status.name} value={status.value}>{status.name}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="productCategory" className="form-label">Category</label>
                        <select id="productCategory" className="form-select" onChange={handleChange} value={productInfo.productCategory}>
                        <option selected value=''>Choose...</option>
                        {
                            allcategories.map(category=>(
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="submit" className={`border btn bg-blue-600 col-md-4 text-gray-200`}>{loading ? btnLoading() : btnText}</button>
                    </div>
                </form>
            </div>
        </Container> 
     );
}
 
export default HandleProducts;