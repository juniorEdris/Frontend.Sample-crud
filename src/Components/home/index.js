import { size } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, LoadingComponent } from "../../utils";
import UseGetData from "../helper/useGetData";

const Home = () => {
    const [allProducts] = UseGetData('api/get-all-products');
    const { data:products } = allProducts
    
    const [allCategories] = UseGetData('api/get-category');
    const { data:categories } = allCategories

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!getUser()){
            navigate('login');
        }
    }, [navigate]);
    useEffect(()=>{
        setLoading(true);
        if(size(products)){
            setLoading(false);
        }
    }, [products]);

    const cards = <div className="flex flex-wrap justify-center">
        {
            products?.map((product)=>(
                <div key={product._id} className="card m-2" style={{width: '18rem'}}>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text mb-1">available since: {moment(product.available_since).format('L')}</p>
                        <p className="card-text mb-1">price: {product.price}</p>
                        <p className="card-text mb-1">category: {categories?.filter(({_id})=> _id === product.category_id)[0]?.name ?? 'none'}</p>
                        <Link to={`products/${product._id}`} className="btn btn-primary">Update Product</Link>
                    </div>
                </div>
            ))
        }
    </div>;
    
    return ( 
        <div className="home-page my-4 container mx-auto">
            {
                loading ? LoadingComponent() : cards    
            }
        </div>
     );
}
 
export default Home;