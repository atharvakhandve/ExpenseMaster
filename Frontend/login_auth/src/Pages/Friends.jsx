import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Siderbar'
import { useState,useEffect } from 'react'
import { BrowserRouter, Link } from "react-router-dom";
import '../Dashboard.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



function Friends() {

const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
}

const [modal, setModal] = useState(false);
const toggleModal=()=>{
    setModal(!modal) 
}

const[email,setEmail] = useState("");
const [message, setMessage] = useState("");
const [friend, setFriend] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
    

const handleAddFriend = async () =>{
    setMessage("");
    setFriend(null);
    if(!email){
        setMessage("Please enter an email")
        return;
    }
    try{
        const res = await axios.post("",{email,

        });
        if(res.data.success){
            setFriend(res.data.user);
            setMessage("Friend Added Successfully!");

        }else{
            setMessage(res.data.message);
        }
    }catch (error) {
        setMessage("An error occurred. Please try again.");
    };
}


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

  return (
    <div className="grid-container">
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar  openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className='main-container'>
        <div className='main-title'>
            <h1>Friends</h1>
        </div>

        <div className='main-cards'>
                <div className='card-inner'>
                    <button 
                    onClick={toggleModal}
                    className='btn'>Add New Friend</button>
                </div>
        </div>

{modal && (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <h2>Enter Your friends Email</h2>
                        <input 
                        className='input'
                        type="email"
                        placeholder="Your Friend's Email"
                        />
                        <button 
                        className='close-modal'
                        onClick={toggleModal}> X </button>
                </div> 
            </div>
        </div>
)}
        



        <div className='main-title'>
            <h1>Friends List</h1>
        </div>

    </main>
    </div>
  )
}

export default Friends