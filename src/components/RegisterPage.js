import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/accounts/register/', {
        email: email,
        password: password,
      });
          setMessage(response.data.message);
          setStatus(response.data.status);
      // Обработка успешной регистрации
      if (response.status === 200) {
        if (response.data.message !== 'Something went wrong') {
          setMessage(response.data.message);
          setStatus(response.data.status);
          navigate('/verify');
        }
        if (response.data.data && response.data.data.email && response.data.data.email.length > 0) {
          setErrorMessage(response.data.data.email[0])
      }

      } else {
      }
    } catch (error) {
      // Обработка сетевой ошибки
      setMessage('Something went wrong. Please try again later.');
      setStatus(400);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <div className="title">
            <span>Registration</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="row button">
              <input type="submit" value="Register" />
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
          {status === 200 ? message : `Error: ${errorMessage}`}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
