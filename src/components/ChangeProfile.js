import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import BASE_URL from "./config";

const ChangeProfile = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const formData = new FormData();
      formData.append('first_name', userInfo.first_name);
      formData.append('last_name', userInfo.last_name);

      await axios.put(
        `${BASE_URL}/api/v1/my_profile/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('User updated successfully');
      alert('Successfully changed');
      window.location.href = `/myprofile`;
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>My Profile</p>
      <form onSubmit={handleSubmit}>
         <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.description}>First Name:</label>
            <input
              id="first_name"
              name="first_name"
              value={userInfo.first_name}
              onChange={handleChange}
            />
          </div>
        <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.description}>Last Name:</label>
            <input
              id="last_name"
              name="last_name"
              value={userInfo.last_name}
              onChange={handleChange}
            />
          </div>
          <div style={styles.buttonContainer}>
          <button style={styles.editButton}>
            Change
          </button>
        </div>
      </form>
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
  formGroup: {
    marginBottom: '15px',
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

export default ChangeProfile;
