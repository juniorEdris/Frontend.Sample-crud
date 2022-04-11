import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../../utils";

const Navbar = () => {
    const classes = "text-slate-50 mr-2 text-lg capitalize";

    const automaticallyLogout = () => {
        toast.error('somthing went wrong! Logging out automatically.');
        localStorage.removeItem('email');
        localStorage.removeItem('accessToken');
        getUser('');
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const handleClick = () => {
        const email = localStorage.getItem('email');
        if(email){
            axios.post(`http://localhost:5000/api/logout`,{ email })
            .then(response=>{
                const { data } = response;
                if(!data?.status){
                    automaticallyLogout();
                }else{
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('email');
                    getUser('');
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            })
            .catch(err=>{
                if (err) {
                    automaticallyLogout();
                }
            });
        }else{
            automaticallyLogout();
        }        
    };

    return ( 
        <div className="sidebar bg-cyan-600 py-2">
            <ul className="flex justify-center">
                <li className={classes}><Link to='/'>home</Link></li>
                <li className={classes}><Link to='/products'>products</Link></li>
                {!getUser()? <li className={classes}><Link to='/login'>login</Link></li> : <li className={classes} role="button" tabIndex="0" onClick={handleClick}>logout</li>}
            </ul>
        </div>
     );
}
 
export default Navbar;