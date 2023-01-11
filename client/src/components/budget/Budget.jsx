import React, {useEffect,useState} from 'react';
import {useCookies} from "react-cookie";
import axios from 'axios';
import Navbar from '../navbar/Navbar';

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
            .get("http://localhost:5000/currentUser",
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

    const handleUpdate = () => {
        
        axios
            .patch(`http://localhost:5000/updateBudget`,
                {
                budget: parseInt(num)
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
        
                window.location.reload()
    }

  return (
    <div>
        <Navbar/>
        {notification && <p style={{background: "green"}}>{message}</p>}
        {warning && <p style={{background: "red"}}>{message}</p>}
        <h1>Budget Report</h1>
        <div>Budget - {budget}</div>
        <div>Total Spendings - {totalSpendings}</div>

        <div></div>
        <form onSubmit={handleUpdate}>
            <label>Update Budget</label>
            <input type="number" onChange={handleChange}/>
            <button>Update</button>
        </form>
    </div>
  )
}

export default Budget