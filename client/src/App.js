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
        <Link to="/friendList" style={linkStyle}><div className='card' style={cardStyle}>Friend List</div></Link>
        <Link to="/payback" style={linkStyle}><div className='card' style={cardStyle}>Pay Back</div></Link>
        <Link to="/initiateTransaction" style={linkStyle}><div className='card' style={cardStyle}>Initiate Transaction</div></Link>
        <Link to="/allTransactions" style={linkStyle}><div className='card' style={cardStyle}>All Transactions</div></Link>
        <Link to="/paymentReport" style={linkStyle}><div className='card' style={cardStyle}>Payment Report</div></Link>
        <Link to="/budget" style={linkStyle}><div className='card' style={cardStyle}>Budget Report</div></Link>
      </div>
    </div>
  );
}

export default App;
