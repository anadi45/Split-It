import React,{useState, useEffect} from 'react';
import {useCookies} from "react-cookie";
import Navbar from '../navbar/Navbar';
import axios from 'axios';

const Initiate = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(false);
  const [warning, setWarning] = useState("");
  const [members, setMembers] = useState([]);
  const [ids, setIds] = useState([]);
  const [friends, setFriends] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "access-control-allow-origin": "*",
      Authorization: "Bearer " + cookie.token
    }
  };

  useEffect(()=>{
    axios
      .get("https://ranjeetbaraik-split-it.onrender.com/allFriends",
        config
          )
      .then((res) => {
        setIds(res.data.friendList);
    });
  },[])

  useEffect(()=>{
    axios
      .post("https://ranjeetbaraik-split-it.onrender.com/names",
          {
              emails: ids
          },
          config
          )
      .then((res) => {
          setFriends(res.data);
      })
    },[ids])

  const handleChange = (e) => {
    let options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setMembers(value)
  }

  const initiateTransaction = (e) => {
    e.preventDefault();

    axios
      .post("https://ranjeetbaraik-split-it.onrender.com/initiateTransaction",
        {
          title: e.target[0].value,
          totalAmount: parseInt(e.target[1].value),
          spendingType: e.target[2].value,
          splitList: members,
          share: parseInt(e.target[4].value)
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

  const notificationStyle = {
      background: "#71de68e6",
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
      {notification && <p style={notificationStyle}>{message}</p>}
      {warning && <p style={warningStyle}>{message}</p>}
      <div style={divStyle}>
        <h3>Initiate New Transaction</h3>
        <form onSubmit={initiateTransaction}>
          <div>
            <label>Title</label>
            <input type="text" name='title' className='form-control'/>
            <label>Amount</label>
            <input type="number" name="amount" className='form-control'/>
          </div>
          <div>
            <label>Spending Category</label>
            <select name="spendingType" className='form-control'>
              <option>Entertainment</option>
              <option>Sports</option>
              <option>Education</option>
              <option>Others</option>
            </select>
          </div>
          <div>
            <label>Split List (Use Ctrl to select multiple memmbers)</label>
            <select name="splitList" multiple onChange={handleChange} className="form-control">
              {friends.length>0 && friends.map((name,idx)=>{
                return (
                  <option value={ids[idx]}>{name}</option>
                  )
                })}
            </select>
          </div>
          <div>
            <label>Your Share</label>
            <input type='number' name="share" className="form-control"/>
          </div>
          <div style={divStyle  && {textAlign:"center"}}>
            <button type="submit" className='btn' style={buttonStyle}>
              Initiate Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Initiate