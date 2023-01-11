import './App.css';
import Navbar from './components/navbar/Navbar';
import {useCookies} from "react-cookie";
import { useEffect } from 'react';
import { Navigate,Link } from 'react-router-dom';

function App() {
  const [cookies, setCookies] = useCookies(["token"]);

  useEffect(()=>{
    
    // console.log(cookies.token)
  },[])

  return (
    <div className="App">
      <Navbar/>
      {cookies.token === undefined && <Navigate to="/entry" replace={true} />}
      <ul style={{listStyleType: "none"}}>
        <li><Link to="/friendList">Friend List</Link></li>
        <li><Link to="/initiateTransaction">Initiate Transaction</Link></li>
        <li><Link to="/allTransactions">All Transactions</Link></li>
        <li><Link to="/payback">Pay Back</Link></li>
        <li><Link to="/paymentReport">Payment Report</Link></li>
        <li><Link to="/budget">Budget Report</Link></li>
      </ul>
    </div>
  );
}

export default App;
