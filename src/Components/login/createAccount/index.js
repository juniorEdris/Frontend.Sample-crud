import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    
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
    
    const handleSubmit = () => {
        setError('');
         if (email && password) {
            if (password.toLocaleLowerCase() === confirmPassword.toLocaleLowerCase()) {
                localStorage.setItem('user', true);
                navigate('/');
            }else{
                // error
                setError('Password did not matched!');
            }
         }else{
            //  error
            setError('Email and password are invalid!');
         };
    };

    return ( 
        <div className="create-account-section w-full">
            <h4 className="pl-9 py-2 text-xl">Sign up</h4>
            <form className="p-9">
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
                        <button onClick={handleSubmit} className="border w-full md:w-1/2 border-slate-900 bg-primary rounded py-lg-2 text-base text-light" type="button">Sign up</button>
                    </div>
                    <div className="">
                        <span className="text-base text-rose-500">{error && error}</span>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default CreateAccount;