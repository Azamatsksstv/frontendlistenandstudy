import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";
import CourseListStyle from '../CourseListStyle.css'
import {Link} from "react-router-dom";
import BASE_URL from "../config";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        // Получаем токен из localStorage
        const token = localStorage.getItem('accessToken');

        // Устанавливаем токен в хедеры запроса
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`${BASE_URL}/api/v1/my_courses/teacher/`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchMyCourses();
  }, []);

  return (
      <div className="course-list-container">
        <h2>My Courses</h2>
        {courses.map((course) => (
        <Link key={course.id} to={`/my-teaching-courses/${course.id}`} className="course-item">
            {course.title}
          </Link>
      ))}
      </div>


  );
};


export default MyCourses;
