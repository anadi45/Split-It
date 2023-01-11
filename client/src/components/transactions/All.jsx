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

    const warningStyle = {
        background: "#d76565",
        textAlign: "center"
    }

    const divStyle = {
        width: "50%",
        margin: "auto",
        marginTop: "20px"
    }

    return (
        <div>
            <Navbar/>
            {warning && <p style={warningStyle}>{message}</p>}
            <div style={divStyle}>
                <h3>All Transactions</h3>
                {
                    transactions.map((trans,idx)=>{
                        return (
                            <div key={idx}  className='card' style={{margin: "20px"}}>
                                <div style={divStyle}><b>S No. </b>{idx+1}</div>
                                <div style={divStyle}><b>Title - </b>{trans.title}</div>
                                <div style={divStyle}><b>Total Amount - </b>{trans.totalAmount}</div>
                                <div style={divStyle}><b>Total Recovered - </b>{trans.recovered}</div>
                                <div style={divStyle}><b>Transaction Date - </b>{new Date(trans.date).toLocaleDateString('en-GB')}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default All