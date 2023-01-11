import React, {useEffect,useState} from 'react';
import {useCookies} from "react-cookie";
import axios from 'axios';
import Navbar from '../navbar/Navbar';

const FriendList = () => {
    
    const [cookie, setCookie] = useCookies(["token"]);
    const [message, setMessage] = useState("");
    const [notification, setNotification] = useState(false);
    const [warning, setWarning] = useState("");
    const [ids, setIds] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(()=>{
        const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookie.token
			}
		};

        axios
			.get("/allFriends",
				config
                )
            .then((res) => {
                setIds(res.data.friendList);
			});
    },[]);

    useEffect(()=>{
        const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*"
			}
		};
        axios
        .post("/names",
            {
                emails: ids
            },
            config
            )
        .then((res) => {
            setFriends(res.data);
        })
    },[ids])

    const addFriend = (e) => {
        e.preventDefault();

        const config = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"access-control-allow-origin": "*",
				Authorization: "Bearer " + cookie.token
			}
		};
        axios
			.post("/addFriend",
				{
					email: e.target[0].value
				},
				config
                )
            .then((res) => {
                setNotification(true);
                setMessage("Friend Added!");
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
            <form onSubmit={addFriend}>
                <label htmlFor="">Add Friend</label>
                <input name="friend" placeholder='Enter Email Address'/>
                <button type='submit'>Add</button>
            </form>
            Friend List
            {
                friends.map((name,index)=>{
                    return (
                        <div key={index}>{name}</div>
                      )
                })
            }
            {
                friends.length === 0 && <p>No Friends Added</p>
            }
        </div>
    )
}

export default FriendList