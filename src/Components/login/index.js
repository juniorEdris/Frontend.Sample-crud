import { useState } from "react";
import Container from "../container";
import CreateAccount from "./createAccount";
import Signin from "./signin";

const Login = () => {
    const [view, setView] = useState('login');
    return ( 
        <Container>
            <div className="login-page py-3">
                <div className="view-nav mb-2">
                    <span className="mr-2 cursor-pointer" onClick={()=> setView('login')} >Login</span> <span className="mr-2">/</span> <span className="mr-2 cursor-pointer" onClick={()=> setView('signup')}>Create new account</span>
                </div>
                <div className=" bg-slate-100">
                    {
                        (() => {
                            if(view === 'login') {
                                return <Signin/>;
                            };
                            return <CreateAccount/>;
                        })()
                    }
                    
                    
                </div>
            </div>
        </Container>
     );
}
 
export default Login;