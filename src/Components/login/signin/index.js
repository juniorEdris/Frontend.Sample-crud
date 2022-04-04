import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) =>{
        if (email && password) {
            localStorage.setItem('user', true);
            // if (password.toLocaleLowerCase() === confirmPassword.toLocaleLowerCase()) {
            // }else{
            //     // error
            //     setError('Credentials did not matched!');
            // }
            navigate('/');
        }else{
            //  error
            setError('Please provide your credentials!');
         };
    };
    return ( 
        <div className="sign-in-section w-full">
            <h4 className="pl-9 py-2 text-xl">Log in</h4>
            <form className="p-9">
                <div className="form flex flex-wrap flex-col">
                    <div className="email mb-3 w-3/4">
                        <div>
                            <label htmlFor="email" className="mr-3">
                                Email: 
                            </label>
                        </div>
                        <input className="outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-1/2" type="email" id="email" onChange={handleEmail} value={email} />
                    </div>
                    <div className="password mb-3 w-3/4">
                        <div>
                            <label htmlFor="password" className="mr-3">
                                Password: 
                            </label>
                        </div>
                        <input className="outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-1/2" type="password" id="password" onChange={handlePassword} value={password} />
                    </div>
                    <div className="">
                        <button onClick={handleSubmit} className="border w-full md:w-1/2 border-slate-900 bg-cyan-700 rounded py-1" type="button">Sign in</button>
                    </div>
                </div>
            </form>
            <div className="">
                <span className="text-base text-rose-500">{error && error}</span>
            </div>
        </div>
     );
}
 
export default Signin;