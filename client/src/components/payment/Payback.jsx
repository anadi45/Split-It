import React,{useEffect, useState} from 'react';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import {useCookies} from "react-cookie";

const Payback = () => {
    const [cookie, setCookie] = useCookies(["token"]);
    const [payments, setPayments] = useState([]);
    const [message, setMessage] = useState("");
    const [warning, setWarning] = useState("");
    const [notification, setNotification] = useState(false);

    const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "access-control-allow-origin": "*",
          Authorization: "Bearer " + cookie.token
        }
      };

    useEffect(()=>{
        axios
            .get("https://ranjeetbaraik-split-it.onrender.com/pendingPayments",
            config
                )
            .then((res) => {
                setPayments(res.data);
            })
            .catch((err)=>{
                setWarning(true);
                setMessage(err);
                const timer = setTimeout(() => {
                    setWarning(false);
                }, 2000);
                return () => clearTimeout(timer);
            })
    },[]);

    const handlePay = (amount,_id) => {
        
        axios
            .post(`https://ranjeetbaraik-split-it.onrender.com/payBack/${_id}`,
                {
                    amount: parseInt(amount)
                },
                config
                )
                .then((res) => {
                setMessage(res.data);
                setNotification(true);
                const timer = setTimeout(() => {
                    setNotification(false);
                }, 2000);
                return () => clearTimeout(timer);
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

    const divStyle = {
        width: "50%",
        margin: "auto",
        marginTop: "20px"
    }

    const buttonStyle = {
        background: "gray",
        margin: "30px"
    }

  return (
    <div>
        <Navbar/>
        {warning && <p style={warningStyle}>{message}</p>}
        <div style={divStyle}>
            <h3>Pending Payments</h3>
                    {
                        payments.map((trans,idx)=>{
                            return (
                                <div key={idx} className='card' style={{margin: "20px"}}>
                                    <div style={divStyle}><b>S No. </b>{idx+1}</div>
                                    <div style={divStyle}><b>Title - </b>{trans.title}</div>
                                    <div style={divStyle}><b>Amount - </b>{(trans.totalAmount-trans.share)/(trans.splitList).length}</div>
                                    <div style={divStyle}><b>Transaction Date - </b>{new Date(trans.date).toLocaleDateString('en-GB')}</div>
                                    <button style={buttonStyle} className='btn' onClick={()=>{
                                        handlePay((trans.totalAmount-trans.share)/(trans.splitList).length,trans.transaction)
                                    }}>Pay Back</button>
                                </div>
                            )
                        })
                    }
        </div>
    </div>
  )
}

export default Payback