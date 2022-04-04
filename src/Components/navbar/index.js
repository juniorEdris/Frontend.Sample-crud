import { Link } from "react-router-dom";

const Navbar = () => {
    const classes = "text-slate-50 mr-2 text-lg capitalize";
    const navbars = [
        {
            id: 'home',
            name: 'home',
            path: '/',
            btn: false
        },
        {
            id: 'login',
            name: 'login',
            path: 'login',
            btn: false
        },
        {
            id: 'products',
            name: 'products',
            path: 'products',
            btn: false
        },
        {
            id: 'logout',
            name: 'logout',
            path: '/',
            btn: true
        },
    ];

    const handleClick = () => {
        localStorage.removeItem('user');
    };

    return ( 
        <div className="sidebar bg-cyan-600 py-2">
            <ul className="flex justify-center">
            {
                navbars.map(({id, name, path, btn}) => (
                    !!btn ? <li className={classes} key={id} role="button" tabIndex="0" onClick={handleClick}>{name}</li> : <li className={classes} key={id}><Link to={path}>{name}</Link></li>
                ))
            }
            </ul>
        </div>
     );
}
 
export default Navbar;