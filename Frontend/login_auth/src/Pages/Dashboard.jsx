
import '../NewDashboard.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Dashboard(){

    const [username, setUsername] = useState(''); // Initialize username state
    const navigate = useNavigate();
    useEffect(() => {
        // Retrieve user session data from cookies
        const storedUsername = Cookies.get('username');
        const storedUserId = Cookies.get('userId');
    
        if (storedUsername && storedUserId) {
          // If data is found in cookies, use it
          setUsername(storedUsername);
        } else {
          // If no session data, redirect to login
          navigate('/login');
        }
      }, [navigate]);
      
    return(
        <div className="container">
        <div className="navbar">
            <Link to='/Groups'/>Groups
            
            <button>Record a Transaction</button>
            <Link to='/Friends'>Add Friends</Link>
        </div>
         <div>
         <h1 className="Welcome">
             <span className='span1' >Welcome,</span>
             <span className='span2'> {username ? <h1>{username}</h1> : <h1>Login first</h1>}</span>
         </h1>
         <h3>Your Total Savings: <span className='span3'>$300</span></h3>
     </div>
     <div className="cards">
            <div className="card">
                <div className="card-content">
                    <p>You spent $200 this month<br/>Remaining Budget: $700</p>
                </div>
                <button>Update Budget</button>
            </div>
     </div>

     <div className="card">
                <div className="card-content">
                    <p>What you spend the most on:</p>
                    <ol>
                        <li>Rent</li>
                        <li>Shopping</li>
                        <li>Subscriptions</li>
                    </ol>
                </div>
                <button>View Transaction History</button>
            </div>


            <div className="card">
                <div className="card-content">
                    <p>Total savings towards your goals:</p>
                    <ol>
                        <li>XBox $100</li>
                        <li>Car $400</li>
                        <li>Tuition $700</li>
                    </ol>
                </div>
                <button>View your goals</button>
            </div> 
     </div>
    )
}

export default Dashboard