import { useState } from "react";

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmail = (e) => {
        console.log({ input: e.target.value });
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        console.log({ input: e.target.value });
        setPassword(e.target.value);
    };

    const handleSubmit = (e) =>{
        e.stopPropagation();
        console.log({ email, password });
    };
    return ( 
        <div className="sign-in-section w-full">
            <h4 className="pl-9 py-2 text-xl">Log in</h4>
            <form className="w-2/3 p-9">
                <div className="form flex flex-wrap flex-col">
                    <div className="email mb-3 w-3/4">
                        <label htmlFor="email" className="mr-3">
                            Email: 
                        </label>
                        <input className="outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-1/2" type="email" id="email" onChange={handleEmail} value={email} />
                    </div>
                    <div className="password mb-3 w-3/4">
                        <label htmlFor="password" className="mr-3">
                            Password: 
                        </label>
                        <input className="outline-none focus:ring focus:border-blue-500 border-none rounded p-1 w-1/2" type="password" id="password" onChange={handlePassword} value={password} />
                    </div>
                    <div className="">
                        <button onClick={handleSubmit} className="border w-1/2 border-slate-300 bg-cyan-700 rounded py-1" type="button">Sign in</button>
                    </div>
                </div>
            </form>
        </div>
     );
}
 
export default Signin;