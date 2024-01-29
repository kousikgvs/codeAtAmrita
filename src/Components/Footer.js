import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      
      <footer class="footer">
      <div class="row">
        <div class="footer-col">
          <h4>CodeAtAmrita</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Members</a></li>
            <li><a href="#">Why Join</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Signup</a></li>
          </ul>
        </div>
        <div class="footer-col"></div>
        <div class="footer-col">
          <h4>get help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">SHALL FILL</a></li>
            <li><a href="#">SHALL FILL</a></li>
            <li><a href="#">SHALL FILL</a></li>
            <li><a href="#">SHALL FILL</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
  </footer>
    </div>
  );
}

export default Footer;
