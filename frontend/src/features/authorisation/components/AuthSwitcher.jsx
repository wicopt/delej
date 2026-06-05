import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { use } from "react";
import './LoginFormStyle.css'

const AuthSwitcher= ()=>{
 const [activeTab, setActiveTab] = useState("login")
 return(
    <div>
        <div  className="mb-2 d-flex justify-content-center">
            <button className={`auth-tab flex-grow-1 ${activeTab ==="login"? "active":""}`} onClick={()=> setActiveTab("login")}>Вход</button>
            <button className={`auth-tab flex-grow-1 ${activeTab==="register"? "active":""}`} onClick={()=> setActiveTab("register")}>Регистрация</button>
        </div>
        <div>
            {activeTab === 'login' && <LoginForm/>}
            {activeTab === 'register' && <RegisterForm/>}
        </div>
    </div>
 );
};

export default AuthSwitcher;