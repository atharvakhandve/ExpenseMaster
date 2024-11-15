import React from 'react'
import '../Styles/Dashboard.css'
import { PieChart, Pie,Tooltip, Sector, ResponsiveContainer } from 'recharts';
import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } 
 from 'recharts';
import { useState,useEffect } from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/Siderbar'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [chartData, setChartData] = useState({});
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  const [username, setUsername] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
     
      const storedUsername = Cookies.get('username');
      const storedUserId = Cookies.get('userId');
  
      if (storedUsername && storedUserId) {
        setUsername(storedUsername);
        fetchUserProfile(storedUserId);
      } else {
        navigate('/login');
      }
    }, [navigate]);
  
    const fetchUserProfile = async (userId) => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/profile', {
          params: { userId },
        });
  
        if (response.data) {
          const { TopCategories } = response.data;
  
          if (TopCategories && TopCategories.length > 0) {
            const labels = TopCategories.map((category) => category.categoryName);
            const values = TopCategories.map((category) => category.totalAmount);
  
            // Set chart data
            setChartData({
              labels,
              datasets: [
                {
                  label: 'Expenses by Top Categories',
                  data: values,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            });
          } else {
            console.warn('No TopCategories data found');
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };
  
    
  return (
    <div className="grid-container">
        <Header OpenSidebar={OpenSidebar}/>
        <Sidebar  openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
    <main className='main-container'>
        <div className='main-title'>
            <h1>DASHBOARD</h1>
        </div>
        <div className='main-cards'>
                <div className='card-inner'>
                    <button className='btn'>+ Add Expense</button>
                </div>
        </div>
        
        <div className='card'>
          <div className='card-inner'>
            <h3>Monthly Budget</h3>
          </div>
        </div>

        <div className='card'>
        <div className='card-inner'>
            <h3>Total Expense</h3>
          </div>
        </div>

        <div className='card'>
        <div className='card-inner'>
            <h3>Total Savings</h3>
          </div>
        </div>

        <div className='main-title'>
            <h1>Graphical Insights</h1>
        </div>

        <div className='charts'>

        <h2>Category Expenses Bar chart</h2>
          {chartData.labels ? (
            <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Expenses by Category' }
              }
            }}
            />
          ):(
            <p>Loading...</p>
          )
          }

          </div>
</main>
</div>
  )
}


export default Home



/*<div className='card-inner'>
                    <button className='btn'>Settle up</button>
</div>*/