import { Link } from "react-router-dom";
import { getUser } from "../../utils";

const Navbar = () => {
    const classes = "text-slate-50 mr-2 text-lg capitalize";

    const handleClick = () => {
        localStorage.removeItem('accessToken');
        getUser('');
        window.location.reload();
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