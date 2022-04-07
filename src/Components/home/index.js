import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils";

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!getUser()){
            navigate('login');
        }
    }, [navigate]);
    
    return ( 
        <div className="home-page">
            <h1 className="text-3xl font-bold underline">Home page</h1>
        </div>
     );
}
 
export default Home;