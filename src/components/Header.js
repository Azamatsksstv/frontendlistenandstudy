import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import axios from "axios";
import BASE_URL from "./config";
// import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
  const token = localStorage.getItem('accessToken');
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userType, setUserType] = useState(null); // State to store user type (teacher or student)

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/api/v1/accounts/token/verify/`, {
          token: token,
        });

        if (response.status === 200) {
          setIsTokenValid(true);

          // Assuming the user type is provided in the response
          const { user_type } = response.data.user;
          setUserType(user_type);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkTokenValidity();
  }, [token]);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>

          {/* Uncomment the following lines if you have a "Teachers" page */}
          {/* <li>
            <Link to="/teachers">Teachers</Link>
          </li> */}
          {isTokenValid ? (
            <>
              {userType === 'Student' ? (
                <>
                  <li>
                    <Link to="/courses">Courses</Link>
                  </li>
                  <li>
                    <Link to="/my-courses">My Courses</Link>
                  </li>
                  <li>
                    <Link to="/myprofile">My Profile</Link>
                  </li>
                </>
              ) : userType === 'Teacher' ? (
                <>
                  <li>
                    <Link to="/my-teaching-courses">Teaching Courses</Link>
                  </li>
                  <li>
                    <Link to="/myprofile">My Profile</Link>
                  </li>
                </>
              ) : userType === 'Admin' ? (
                <>
                  <li>
                    <Link to="/courses-admin">Courses</Link>
                  </li>
                  <li>
                    <Link to="/myprofile">My Profile</Link>
                  </li>
                </>
              ) : null}            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
