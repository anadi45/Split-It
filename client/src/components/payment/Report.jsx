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
        .get("https://ranjeetbaraik-split-it.onrender.com/owe",
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
    },[]);

    const divStyle = {
      width: "50%",
      margin: "auto",
      marginTop: "20px"
  }

  return (
    <div>
        <Navbar/>
        <div style={divStyle}>
          <h3>Payment Report</h3>
          <div>
            <b>Others owe you - </b>{woy}
          </div>
          <div>
            <b>You owe others - </b>{yow}
          </div>
        </div>
    </div>
  )
}

export default Report