import { useNavigate } from "react-router-dom";

const UseRedirect = () => {
    const navigate = useNavigate();
    const redirectTo = (route) => {
        const loggedin = localStorage.getItem('accessToken');
        if(!loggedin) {
            navigate(route)
        };
    }
    return [redirectTo];
}
 
export default UseRedirect;