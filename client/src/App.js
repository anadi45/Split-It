import './App.css';
import Navbar from './components/navbar/Navbar';
import { useCookies } from "react-cookie";
import { Navigate, Link } from 'react-router-dom';

function App() {

  const cardStyle = { background: "gray", width: "10rem", height: "15rem", marginTop: "230px", marginLeft: "20px", marginRight: "20px", display: "flex", justifyContent: "center" };
  const divStyle = { display: "flex", flexDirection: "row", justifyContent: "space-evenly" }
  const linkStyle = { textDecoration: "none", color: "white" }
  const [cookies, setCookies] = useCookies(["token"]);

  return (
    <div className="App">
      <Navbar />
      {cookies.token === undefined && <Navigate to="/entry" replace={true} />}
      <div style={divStyle}>
        <div className='card' style={cardStyle}><Link to="/friendList" style={linkStyle}>Friend List</Link></div>
        <div className='card' style={cardStyle}><Link to="/payback" style={linkStyle}>Pay Back</Link></div>
        <div className='card' style={cardStyle}><Link to="/initiateTransaction" style={linkStyle}>Initiate Transaction</Link></div>
        <div className='card' style={cardStyle}><Link to="/allTransactions" style={linkStyle}>All Transactions</Link></div>
        <div className='card' style={cardStyle}><Link to="/paymentReport" style={linkStyle}>Payment Report</Link></div>
        <div className='card' style={cardStyle}><Link to="/budget" style={linkStyle}>Budget Report</Link></div>
      </div>
    </div>
  );
}

export default App;
