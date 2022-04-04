import { useState } from "react";
import Container from "../container";

const UpdateProducts = () => {
    const [productInfo, setProductInfo] = useState({
        productName: '',
        productPrice: '',
        availableFrom: '',
        productStatus: '',
    });

    const handleChange = (e) => {
        setProductInfo({
            ...productInfo,
            [e.target.id]: e.target.value
        })
    };
    
    return (
        <Container>
            <div className="py-4 w-full">
                <h4 className="py-2 text-xl">Product Update</h4>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" placeholder="Product Name" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="productPrice" className="form-label">Product Price</label>
                        <input type="number" className="form-control" id="productPrice" placeholder="Product Price" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="availableFrom" className="form-label">Available from</label>
                        <input type="date" className="form-control" id="availableFrom" placeholder="Available from" onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="productStatus" className="form-label">State</label>
                        <select id="productStatus" className="form-select" onChange={handleChange}>
                        <option selected>Choose...</option>
                        <option value='active'>Active</option>
                        <option value='deactive'>Deactive</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <button type="button" className="border btn bg-blue-600 col-md-4 text-gray-200">Update</button>
                    </div>
                </form>
            </div>
        </Container> 
     );
}
 
export default UpdateProducts;