import React, {useState} from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import {useCookies} from "react-cookie";
import { useNavigate } from 'react-router-dom';

const Entry = () => {

    const [cookie, setCookie] = useCookies(["token"]);
    const [message, setMessage] = useState("");
    const [notification, setNotification] = useState(false);
    const [warning, setWarning] = useState("");
    const navigate = useNavigate();

    const signUp = (e) => {
        
        e.preventDefault();

        const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*"
			}
		};
        axios
			.post(
				"https://ranjeetbaraik-split-it.onrender.com/signup",
				{
					name: e.target[0].value,
                    email: e.target[1].value,
                    password: e.target[2].value
				},
				config
                )
            .then((res) => {
                setCookie("token", res.data, { path: "/" });
                navigate("/");
			})
            .catch((err)=>{
                setWarning(true);
                setMessage(err.response.data);
                const timer = setTimeout(() => {
                    setWarning(false);
                }, 2000);
                return () => clearTimeout(timer);
            })
    }

    const logIn = (e) => {
        e.preventDefault();

        const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*"
			}
		};
        axios
			.post("https://ranjeetbaraik-split-it.onrender.com/login",
				{
                    email: e.target[0].value,
                    password: e.target[1].value
				},
				config
                )
            .then((res) => {
                setCookie("token", res.data, { path: "/" });
                navigate("/");
			})
            .catch((err)=>{
                setWarning(true);
                setMessage(err.response.data);
                const timer = setTimeout(() => {
                    setWarning(false);
                }, 2000);
                return () => clearTimeout(timer);
            })
    }

    const warningStyle = {
        background: "#d76565",
        textAlign: "center"
    }

    const notificationStyle = {
        background: "#71de68e6",
        textAlign: "center"
    }

    return (
        <>
            <Navbar/>
            {notification && <p style={notificationStyle}>{message}</p>}
            {warning && <p style={warningStyle}>{message}</p>}
            <div>
                <div className="main">  	
                    <div className="signup">
                        <form onSubmit={signUp}>
                            <label htmlFor="chk" aria-hidden="true">Sign up</label>
                            <input type="text" name="name" placeholder="Full Name"/>
                            <input type="email" name="email" placeholder="Email"/>
                            <input type="password" name="password" placeholder="Password"/>
                            <button>Sign up</button>
                        </form>
                    </div>

                    <div className="login">
                        <form onSubmit={logIn}>
                            <label htmlFor="chk" aria-hidden="true">Login</label>
                            <input type="email" name="email" placeholder="Email"/>
                            <input type="password" name="password" placeholder="Password"/>
                            <button>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Entry