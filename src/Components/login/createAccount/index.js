import Axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../../../utils";

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
         if (email && password) {
            if(email.includes('@')){
                if (email.includes('.com')) {
                    if(password.toLocaleLowerCase().length > 6){
                        if (password.toLocaleLowerCase() === confirmPassword.toLocaleLowerCase()) {
                            Axios.post(`http://localhost:5000/api/register`,{ email, password})
                                .then(response=>{
                                    const { data } = response;
                                    if(!data.data.status){
                                        toast.error(data.data.message);
                                    }else{
                                        localStorage.setItem('accessToken', data.data.accessToken);
                                        getUser('loggedin');
                                        navigate('/');
                                        window.location.reload();
                                    }
                                })
                                .catch(err=>{
                                    if (err) {
                                        toast.error('Invalid credentials');
                                    }
                                });
                        }else{
                            // error
                            toast.error('Password did not matched!');
                        }
                    }else{
                        // error
                        toast.error('Password should be longer than 6!');
                    }
                } else {
                    // error
                    toast.error('Invalid credentials!');
                }
            }else{
                // error
                toast.error('Invalid credentials!');
            }
        }else{
        //  error
        toast.error('Invalid credentials!');
        };
    };

    return ( 
        <div className="create-account-section w-full">
            <h4 className="pl-9 py-2 text-xl">Sign up</h4>
            <form className="p-9" onSubmit={handleSubmit}>
                <div className="form flex flex-wrap flex-col">
                    <div className="email mb-3">
                        <div>
                            <label htmlFor="email" className="mr-3">
                                Email: 
                            </label>
                        </div>
                        <input className="py-lg-2 outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-full md:w-3/4" type="email" id="email" onChange={handleEmail} value={email} />
                    </div>
                    <div className="password mb-3">
                        <div>
                            <label htmlFor="password" className="mr-3">
                                Password: 
                            </label>
                        </div>
                        <input className="py-lg-2 outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-full md:w-3/4" type="password" id="password" onChange={handlePassword} value={password} />
                    </div>
                    <div className="password mb-3">
                        <div>
                            <label htmlFor="con-password" className="mr-3">
                                Confirm Password: 
                            </label>
                        </div>
                        <input className="py-lg-2 outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-full md:w-3/4" type="password" id="con-password" onChange={handleConfirmPassword} value={confirmPassword} />
                    </div>
                    <div className="">
                        <button className="border w-full md:w-1/2 border-slate-900 bg-primary rounded py-lg-2 text-base text-light" type="submit">Sign up</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default CreateAccount;