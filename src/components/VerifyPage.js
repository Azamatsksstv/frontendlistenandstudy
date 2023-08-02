import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VerifyPage.css';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/accounts/verify/', {
        email: email,
        otp: otp,
      });
          setMessage(response.data.message);
          setStatus(response.data.status);
          if (response.status === 200) {
        if (response.data.message === 'Account verified') {
          navigate('/login');
        }
      } else {
      }
    } catch (error) {
      // Обработайте ошибку, например, показав сообщение об ошибке
      setMessage('Something went wrong. Please try again later.');
      setStatus('400');
}
  };

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Verification</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/*<div className="row">*/}
            {/*  <i className="fas fa-lock"></i>*/}
            {/*  <input*/}
            {/*    type="password"*/}
            {/*    placeholder="Password"*/}
            {/*    required*/}
            {/*    value={password}*/}
            {/*    onChange={(e) => setPassword(e.target.value)}*/}
            {/*  />*/}

            {/*</div>*/}

            <div className="row">
              <i className="fas fa-key"></i>
              <input
                type="number"
                placeholder="OTP"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

            </div>

            <div className="row button">
              <input type="submit" value="Verify" />
            </div>
            <div className="signup-link">
              Already have an account? <Link to="/login">Sign in now</Link>
            </div>
          </form>
        </div>
      </div>
      {/* Показываем уведомление только если message не равен null */}
      {message && (
        <div className={`notification ${status === 200 ? 'success' : 'error'}`}>
          {status === 200 ? message : `Error: ${message}`}
        </div>
      )}    </div>
  );
};

export default RegisterPage;
