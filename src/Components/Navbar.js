import React from "react";
import "./Navbar.css";
import acmlogo from "../svg/acmlogo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Button from '@mui/material/Button';
import { useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Navbar() {
  const navigate = useNavigate();
  const [parsedData, setParsedData] = useState({});

useEffect(() => {
    const storedData = localStorage.getItem('user-data');
    if (storedData) {
      setParsedData(JSON.parse(storedData));
    }
  }, [localStorage.getItem('user-data')]); // Run effect when user data changes

  const isLoggedIn = !!parsedData.email; // Check for existence of email in parsed data

  function myFunction() {
    const topnav = document.getElementById("myTopnav");
    topnav.classList.toggle("responsive");

    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('user-data');
    window.location.reload();
    setParsedData({});
  };
  
  return (
    <header>
      <div className="topnav" id="myTopnav">
        <a className="active" onClick={() => navigate("/")}>
          <img src={acmlogo} height={60} width={190} />
        </a>
        <a className="icon" onClick={myFunction}>
          <i className="fa fa-bars"></i>
        </a>
        <a className="Members" onClick={() => navigate("/members")}>
          {" "}
          <img
            src={"https://cdn-icons-png.flaticon.com/512/1357/1357616.png"}
            height={40}
            width={40}
          />{" "}
          <span>Members</span>
        </a>
        <a className="Anouncements" onClick={() => navigate("/anouncements")}>
          {" "}
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3721/3721625.png"}
            height={40}
            width={40}
          />{" "}
          <span>Anouncements</span>
        </a>
        <a className="Why" onClick={() => navigate("/why")}>
          <img
            src={"https://cdn-icons-png.flaticon.com/512/3528/3528449.png"}
            height={40}
            width={40}
          />{" "}
          <span>Why Join Us</span>
        </a>
        <a className="ContactUs" onClick={() => navigate("/resources")}>
          {" "}
          <img
            src="https://cdn-icons-png.flaticon.com/512/10150/10150310.png"
            height={40}
            width={40}
          />
          <span>Resources</span>
        </a>
        
          {isLoggedIn ? (
            <>
          <a className="Signin">
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              height={40}
              width={40}
            />
            <span style={{"color":"black"}}>{parsedData.email}</span>
          </a>
          <a className="Signup" onClick={handleLogout}>
            {" "}
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
              height={40}
              width={40}
            />
            <span style={{"color":"black"}}>Logout</span>
          </a>
</>          
        ) : (
          <>
            <a className="Signin">
              {" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
                height={40}
                width={40}
              />
              <span><Login /></span>
            </a>
            <a className="Signup">
              {" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/5721/5721113.png"
                height={40}
                width={40}
              />
              <span><Signup /></span>
            </a>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
