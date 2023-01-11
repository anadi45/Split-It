import React, {useEffect} from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();
    useEffect(() => {
      removeCookie("token");
      navigate("/");
    }, []);
}

export default Logout