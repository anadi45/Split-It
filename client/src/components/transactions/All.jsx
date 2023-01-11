import React,{useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import Navbar from "../navbar/Navbar";
import axios from 'axios';


const All = () => {
    const [cookie, setCookie] = useCookies(["token"]);
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState("");
    const [warning, setWarning] = useState("");

    const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "access-control-allow-origin": "*",
          Authorization: "Bearer " + cookie.token
        }
      };

    useEffect(()=>{
        axios
            .get("https://ranjeetbaraik-split-it.onrender.com/allTransactions",
            config
                )
            .then((res) => {
                setTransactions(res.data);
            })
            .catch((err)=>{
                setWarning(true);
                setMessage(err.response.data);
                const timer = setTimeout(() => {
                    setWarning(false);
                }, 2000);
                return () => clearTimeout(timer);
            })
    },[])

    return (
        <div>
            <Navbar/>
            {warning && <p style={{background: "red"}}>{message}</p>}
            <div>
                <h4>All Transactions</h4>
                {
                    transactions.map((trans,idx)=>{
                        return (
                            <div key={idx}>
                                <div>{idx+1}</div>
                                <div>{trans.title}</div>
                                <div>{trans.totalAmount}</div>
                                <div>{trans.recoverd}</div>
                                <div>{new Date(trans.date).toLocaleDateString('en-GB')}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default All