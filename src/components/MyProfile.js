import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import BASE_URL from "./config";

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/my_profile/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Передаем токен в хедере для аутентификации
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    // Удалите токен из localStorage и перенаправьте пользователя на страницу выхода из системы
    localStorage.removeItem('accessToken');
    alert('Logged out')
    window.location.href = '/dashboard'; // Предполагается, что у вас есть страница для выхода из системы с путем '/logout'
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>My Profile</p>
      <p style={styles.description}>First Name: {userInfo.first_name}</p>
      <p style={styles.description}>Last Name: {userInfo.last_name}</p>
      <p style={styles.description}>User type: {userInfo.user_type}</p>
        <div style={styles.buttonContainer}>
          <Link to="/myprofile/edit">
            <button style={styles.editButton}>
              Edit
            </button>
          </Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: '50px auto',
    padding: '20px',
    maxWidth: '600px',
    backgroundColor: '#f7f7f7',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#555',
  },
  buttonContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#f83030',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
   editButton: {
    padding: '10px 20px',
    backgroundColor: '#a07916',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
     marginRight: '10px',
  },
};

export default MyProfile;
