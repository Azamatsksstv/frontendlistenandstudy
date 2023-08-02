import React from 'react';
import './LoginPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/accounts/token/', {
        email: email,
        password: password,
      });

      // Сохраняем токен доступа и refresh token в localStorage или другом месте
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      // Переход на другую страницу, например, на домашнюю страницу после успешной аутентификации
      window.location.href = '/dashboard';
    } catch (error) {
      // Обработка ошибки при аутентификации
      setError('Invalid email or password');
    }
  };

  return (
    <div>
        <div className="container">
            <div className="wrapper">
                <div className="title"><span>Login</span></div>
                <form onSubmit={handleLogin}>
                    <div className="row">
                        <i className="fas fa-user"></i>
                        <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>
                    <div className="row">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required/>
                    </div>
                    {/*<div className="pass"><a href="#">Forgot password?</a></div>*/}
                    <div className="row button">
                        <input type="submit" value="Login"/>
                    </div>
                    <div className="signup-link">Not a member? <Link to="/registration">Signup now</Link></div>
                </form>
            </div>
            {error && (
        <div className='notificationError'>
          {`Error: ${error}`}
        </div>
      )}
        </div>

      {/* Форма регистрации и другие элементы интерфейса */}
    </div>
  );
};

export default LoginPage;
