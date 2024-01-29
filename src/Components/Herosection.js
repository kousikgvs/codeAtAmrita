import React from 'react'
import './Herosection.css'
import codeat from '../svg/codeat.svg'
import amrita from '../svg/Amrita.svg'
import openB from '../svg/openB.svg'
import closeB from '../svg/closeB.svg'
import slash from '../svg/slash.svg'
import { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Herosection() {
  const navigate = useNavigate();
  const [parsedData, setParsedData] = useState({});
  useEffect(() => {
    const storedData = localStorage.getItem('user-data');
    if (storedData) {
      setParsedData(JSON.parse(storedData));
    }
  }, [localStorage.getItem('user-data')]); 

  const isLoggedIn = !!parsedData.email; 

  const showToast = () => {
    toast.warning('Please Login to Continue to dashboard', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const Continue = () => {
    if(isLoggedIn){
      navigate("/dashboard")
    }
    else{
      showToast();
      return;
    }
  }

  return (
    <div className='hero-container'>
      <div className='herosection'>
        <div className='svg-cont'>
          <img src={openB} alt='codeat' className='openB' ></img>
          <img src={codeat} alt='codeat' className='codeat'  />
          <img src={slash} alt='codeat' className='slash' width={150}></img>
          <img src={amrita} alt='codeat' className='amrita' />
          <img src={closeB} alt='codeat' className='closeB'></img>
        
          <div class="line anim-typewriter">Create Iterate Code .. Repeat </div>
          <button className='dashboard-btn button-85' onClick={Continue}>
            Continue to Dashboard
            {"              "}
            <img src='https://cdn-icons-png.flaticon.com/512/556/556690.png' height={30} width={30}/>
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Herosection