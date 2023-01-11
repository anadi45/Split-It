import React, {useEffect,useState} from 'react';
import {useCookies} from "react-cookie";
import axios from 'axios';
import Navbar from '../navbar/Navbar';
import e from 'cors';

const Budget = () => {

    const [cookie, setCookie] = useCookies(["token"]);
    const [budget, setBudget] = useState(0);
    const [totalSpendings, setTotalSpendings] = useState(0);
    const [id,setId] = useState("");
    const [message, setMessage] = useState("");
    const [notification, setNotification] = useState(false);
    const [warning, setWarning] = useState("");
    const [num,setNum] = useState(0);

    const config = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "access-control-allow-origin": "*",
          Authorization: "Bearer " + cookie.token
        }
      };

      useEffect(()=>{
        axios
            .get("https://ranjeetbaraik-split-it.onrender.com/currentUser",
            config
                )
            .then((res) => {
                setId(res.data._id);
                if(res.data.budget) {
                    setBudget(res.data.budget);
                }
                if(res.data.totalSpendings) {
                    setTotalSpendings(res.data.totalSpendings);
                }
            })
    },[])

    
    const handleChange = (e) => {
        e.preventDefault();
        setNum(e.target.value);
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        axios
            .patch(`https://ranjeetbaraik-split-it.onrender.com/updateBudget`,
                {
                    budget: parseInt(num)
                },
                config
                )
                .then((res) => {
                    console.log(res.data)
                setMessage(res.data);
                setNotification(true);
                const timer = setTimeout(() => {
                    setNotification(false);
                }, 2000);
                return () => clearTimeout(timer);
                })
                .catch((err)=> {
                    setWarning(true);
                    setMessage(err.response.data);
                    const timer = setTimeout(() => {
                        setWarning(false);
                    }, 2000);
                    return () => clearTimeout(timer);
                })
    }

    const divStyle = {
        width: "50%",
        margin: "auto",
        marginTop: "20px"
    }

    const warningStyle = {
        background: "#d76565",
        textAlign: "center"
    }

    const notificationStyle = {
        background: "#71de68e6",
        textAlign: "center"
    }

    const buttonStyle = {
        background: "gray",
        margin: "30px"
    }

  return (
    <>
        <div>
            <Navbar/>
            {notification && <p style={notificationStyle}>{message}</p>}
            {warning && <p style={warningStyle}>{message}</p>}
            <div style={divStyle}>
                <h3>Budget Report</h3>
                <div>
                    <b>Total Spendings - </b>{totalSpendings}
                </div>
                <div>
                    <b>Budget - </b>{budget}
                </div>

                <form onSubmit={handleUpdate} className='form-group' style={{marginTop: "40px"}}>
                    <label>Update Budget</label>
                    <input type="number" onChange={handleChange} className='form-control'/>
                    <div style={divStyle && {textAlign: "center"}}>
                        <button className='btn' style={buttonStyle}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default Budget