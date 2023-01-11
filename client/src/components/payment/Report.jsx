import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Navbar from '../navbar/Navbar';
import axios from 'axios';

const Report = () => {
    const [cookie, setCookie] = useCookies(["token"]);
    const [woy, setWoy] = useState(0);
    const [yow, setYow] = useState(0);

    const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "access-control-allow-origin": "*",
          Authorization: "Bearer " + cookie.token
        }
      };

    useEffect(()=>{
        axios
        .get("http://localhost:5000/owe",
        config
            )
        .then((res) => {
            
            if(res.data.owesYou) {
                setWoy(res.data.owesYou);
            }
            if(res.data.youOwe) {
                setYow(res.data.youOwe);
            }
        })
    },[])
  return (
    <div>
        <Navbar/>
        <h1>Payment Report</h1>
        <div>Others owe you - {woy}</div>
        <div>You owe others - {yow}</div>
    </div>
  )
}

export default Report