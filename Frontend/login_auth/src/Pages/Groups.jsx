import React from "react";
import Header from '../Components/Header'
import Sidebar from '../Components/Siderbar'
import { useState,useEffect } from 'react'
import '../Styles/Dashboard.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


 function Groups(){
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }

    const [modal, setModal] = useState(false);
    const toggleModal=()=>{
    setModal(!modal) 
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

     

    return(
        <div className="grid-container">
                <Header OpenSidebar={OpenSidebar}/>
                <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <main className='main-container'>

                <div className='main-title'>
                      <h1 className="h1">Your Groups</h1>
                </div>
                <div className='main-cards'>
                    <div className='card-inner'>
                    <button 
                    onClick={toggleModal}
                    className='btn'>Create New Group</button>
                    </div>
                </div>

                {modal && (
        <div className="modal">
            <div className="overlay">
                <div className="modal-content">
                    <h2>New Group</h2>
                        <input 
                        className='input'
                        type="text"
                        placeholder="Enter Group Name"
                        />
                        <button 
                        
                        type='submit'
                        className='friend-btn'>Create Group</button>

                        <button 
                        className='close-modal'
                        onClick={toggleModal}> X </button>
                </div> 
            </div>
        </div>
)}


                <div className='main-title'>
                  <h1 className="h1">All Groups</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Inner Circle</h3>
                    </div>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>Roomates</h3>
                    </div>
                </div>
                </main>
        </div>
    )
 }

 export default Groups