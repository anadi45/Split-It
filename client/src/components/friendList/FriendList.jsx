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
			.get("https://ranjeetbaraik-split-it.onrender.com/allFriends",
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
			.post("https://ranjeetbaraik-split-it.onrender.com/addFriend",
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

    const divStyle = {
        width: "50%",
        margin: "auto",
        marginTop: "20px"
    }

    const buttonStyle = {
        background: "gray",
        margin: "30px"
    }

    const warningStyle = {
        background: "#d76565",
        textAlign: "center"
    }

    const notificationStyle = {
        background: "#71de68e6",
        textAlign: "center"
    }
    return (
        <div>
            <Navbar/>
            {notification && <p style={notificationStyle}>{message}</p>}
            {warning && <p style={warningStyle}>{message}</p>}
            <div style={divStyle}>
                <form onSubmit={addFriend} className="form-group">
                    <h3>Add Friend</h3>
                    <input name="friend" placeholder='Enter Email Address' className='form-control'/>
                    <div style={divStyle && {textAlign: "center"}}>
                        <button type='submit' className='btn' style={buttonStyle}>Add</button>
                    </div>
                </form>
            </div>
            <div style={divStyle}>
                <h3>Friend List</h3>
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
        </div>
    )
}

export default FriendList