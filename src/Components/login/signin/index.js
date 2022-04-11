import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { btnLoading, getUser } from "../../../utils";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    useEffect(()=>{
        if(getUser()) navigate('/');
    }, [navigate])

    const handleSubmit = (e) =>{
        setLoading(true);
        e.preventDefault();
        if (email && password) {
            if(email.includes('@') || email.includes('.com')){
                if (password.toLocaleLowerCase().length > 6) {
                    Axios.post(`http://localhost:5000/api/login`,{ email, password})
                    .then(response=>{
                        const { data } = response;
                        if(!data.status){
                            setLoading(false);
                            toast.error(data.message);
                        }else{
                            setLoading(false);
                            localStorage.setItem('accessToken', data?.data?.accessToken);
                            localStorage.setItem('email', data?.data?.email);
                            getUser('loggedin');
                            navigate('/');
                            window.location.reload();
                        }
                    })
                    .catch(err=>{
                        if (err) {
                            toast.error('Invalid credentials!');
                            setLoading(false);
                        }
                    });
                }else{
                    // error
                    toast.error('Password should be above 6 characters!');
                    setLoading(false);
                }
            }else{
                toast.error('Provide credentials including @ and .com');                
                setLoading(false);
            }
        }else{
            //  error
            toast.error('Please provide your credentials!');
            setLoading(false);
         };
    };

    return ( 
        <div className="sign-in-section w-full">
            <h4 className="pl-9 py-2 text-xl">Log in</h4>
            <form className="p-9" onSubmit={handleSubmit}>
                <div className="form flex flex-wrap flex-col">
                    <div className="email mb-3">
                        <div>
                            <label htmlFor="email" className="mr-3">
                                Email: 
                            </label>
                        </div>
                        <input className=" py-lg-2 outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-full md:w-3/4" type="email" id="email" onChange={handleEmail} value={email} />
                    </div>
                    <div className="password mb-3">
                        <div>
                            <label htmlFor="password" className="mr-3">
                                Password: 
                            </label>
                        </div>
                        <input className=" py-lg-2 outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-full md:w-3/4" type="password" id="password" onChange={handlePassword} value={password} />
                    </div>
                    
                    <div className="">
                        <button className="border w-full md:w-1/2 border-slate-900 bg-primary rounded py-lg-2 text-base text-light" type="submit">{loading ? btnLoading() : 'Sign in'}</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Signin;