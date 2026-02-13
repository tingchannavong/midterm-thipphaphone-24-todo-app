import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useUserStores from "../stores/todoStores";

function Login() {

const setUser = useUserStores((state) => state.setUser);

const [loginData, setLoginData] = useState({
    username: "",
    password: ""
});

const navigate = useNavigate();

const hdlChange = (e) => {
    const { name, value } = e.target;
    setLoginData({...loginData, [name] : value});
}

const hdlSubmit = async (e) => {
    e.preventDefault();

    // validate later

    // login via post to hdl login error with try catch
    try {
        const LOGIN_API = 'https://drive-accessible-pictures-send.trycloudflare.com/auth/login';
        const res = await axios.post(LOGIN_API, loginData);
        console.log(res.data.user);
        if (res.status === 200) {
            // store user data ID, token etc.
            setUser(res.data.user);
            navigate('/my-todo');
        }
    } catch (error) {
        console.log(error);
    }
}

const inputStyles = "bg-[#3a4150] rouded-md p-3 text-gray-200 focus:bg-white focus:text-black";
  return (
    <div className="login-box mx-auto mt-25 p-5 w-xl h-auto bg-[#202936] text-xl rounded-md">
        <form onSubmit={hdlSubmit} className="flex flex-col gap-7">
            <h1 className="text-white p-2 text-3xl">Welcome</h1>
            <input type="text" 
            placeholder="Username"
            name="username"
            value={loginData.username}
            onChange={hdlChange} 
            className={inputStyles}/>
            <input type="text" 
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={hdlChange} 
            className={inputStyles}/>
            <button type="submit" className={`${inputStyles} uppercase font-bold hover:bg-purple-500 cursor pointer`}>
                Log In</button> 
            <p className="text-white text-center underline underline-offset-3 italic cursor-pointer  hover:text-purple-300 ">
                New user? Click here to register</p>
        </form>
     
        {/* <pre className="text-white">{JSON.stringify(loginData)}</pre> */}
    </div>
  )
}

export default Login