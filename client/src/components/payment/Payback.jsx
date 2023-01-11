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
            .get("/pendingPayments",
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
            .post(`/payback/${_id}`,
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
        window.location.reload();
    }

  return (
    <div>
        <Navbar/>
        {warning && <p style={{background: "red"}}>{message}</p>}
        <h4>Pending Payments</h4>
                {
                    payments.map((trans,idx)=>{
                        return (
                            <div key={idx}>
                                <div>{idx+1}</div>
                                <div>{trans.title}</div>
                                <div>{(trans.totalAmount-trans.share)/(trans.splitList).length}</div>
                                <div>{new Date(trans.date).toLocaleDateString('en-GB')}</div>
                                <button className='btn btn-primary' onClick={()=>{
                                    handlePay((trans.totalAmount-trans.share)/(trans.splitList).length,trans._id)
                                }}>Pay Back</button>
                            </div>
                        )
                    })
                }
    </div>
  )
}

export default Payback