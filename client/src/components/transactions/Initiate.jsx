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

  return (
  
    <div>
      <Navbar/>
      {notification && <p style={{background: "green"}}>{message}</p>}
      {warning && <p style={{background: "red"}}>{message}</p>}
        Initiate New Transaction
        <form onSubmit={initiateTransaction}>
            <label>Title</label>
            <input type="text" name='title'/>
            <label>Amount</label>
            <input type="number" name="amount"/>
            <label>Spending Category</label>
            <select name="spendingType">
              <option>Entertainment</option>
              <option>Sports</option>
              <option>Education</option>
              <option>Others</option>
            </select>
            <label>Split List (Use Ctrl to select multiple memmbers)</label>
            <select name="splitList" multiple onChange={handleChange}>
              {friends.length>0 && friends.map((name,idx)=>{
                return (
                  <option value={ids[idx]}>{name}</option>
                )
              })}
            </select>
            <label>Your Share</label>
            <input type='number' name="share"/>
          <button type="submit">
            Initiate Transaction
          </button>
        </form>
    </div>
  )
}

export default Initiate