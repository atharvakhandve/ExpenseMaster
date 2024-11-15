import React from 'react';
import '../Styles/Dashboard.css';
import { Pie, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Siderbar';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [chartData, setChartData] = useState({});
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  const [category, setCategory] = useState('Food');
  const [inputValue, setInputValue] = useState('');
  const [expenses, setExpenses] = useState({
    Food: [],
    Travel: [],
    Rent: [],
    Subscriptions: [],
    Entertainment: [],
  });

  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const fetchUserProfile = async (userId) => {
    try {
      // Make the API call
      const response = await axios.get('http://localhost:3000/api/users/profile', {
        params: { user: userId },
      });
  
      // Log the full response to verify its structure
      console.log('Full API Response:', response);
  
      // Access the data from the nested structure
      const { response: resData } = response.data;
  
      if (resData && resData.UserData && resData.UserData._id) {
        const { TopCategories } = resData;
  
        // Check if TopCategories is valid and has data
        if (Array.isArray(TopCategories) && TopCategories.length > 0) {
          const labels = TopCategories.map((category) => category.categoryName);
          const values = TopCategories.map((category) => category.totalAmount);
  
          // Set the chart data
          setChartData({
            labels,
            datasets: [
              {
                label: 'Expenses by Top Categories',
                data: values,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#4BC0C0',
                  '#9966FF',
                  '#FF9F40',
                ],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
              },
            ],
          });
        } else {
          console.warn('No TopCategories data found');
        }
      } else {
        console.error('No valid user data returned from the API');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    }
  };
  
  

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    const storedUserId = Cookies.get('userId');
    console.log(storedUserId);

    if (storedUsername && storedUserId) {
      setUsername(storedUsername);
      fetchUserProfile(storedUserId);
    } else {
      navigate('/login');
    }
  }, [navigate]);


  ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);



   
    const [chartInstance, setChartInstance] = useState(null);
  
    useEffect(() => {
      // Destroy the previous chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }
  
      // Fetch or update chart data here and then set it
      const newChartData = {
        labels: ['Food', 'Rent', 'Entertainment'],
        datasets: [
          {
            label: 'Expenses by Category',
            data: [100, 200, 50],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
      

    }, [chartData]); 
  

  // Move the return statement inside the Home function
  return (
    <div className="grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <main className="main-container">
        <div className="main-title">
          <h1 className="h1">DASHBOARD</h1>
        </div>
        <div className="main-cards">
          <div className="card-inner">
            <button onClick={toggleModal} className="btn">
              + Add Expense
            </button>
          </div>
        </div>
        {modal && (
          <div className="overlay">
            <div className="modal">
              <div className="modal-content">
                <button className="close-modal" onClick={toggleModal}>
                  X
                </button>
                <h2>New Expense</h2>
                <select
                  className="category-dropdown"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Rent">Rent</option>
                  <option value="Subscriptions">Subscriptions</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                <input
                  className="input"
                  type="number"
                  placeholder="Enter Amount"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="friend-btn">
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-inner">
            <h3>Monthly Budget</h3>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Total Expense</h3>
          </div>
        </div>

        <div className="card">
          <div className="card-inner">
            <h3>Total Savings</h3>
          </div>
        </div>

        <div className="main-title">
          <h1 className="h1">Graphical Insights</h1>
        </div>

        <div className="charts">
          <h2 className="h1">Category Expenses Pie Chart</h2>
          {chartData.labels && chartData.datasets ? (
            <Pie
            key={JSON.stringify(chartData)}
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: { enabled: true },
                  title: { display: true, text: 'Expenses by Category (Pie Chart)' },
                },
              }}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
