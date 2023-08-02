import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseListStyle from './CourseListStyle.css'
import {Link} from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Функция для получения списка курсов с Django backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/dashboard/courses/');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list-container">
      <h2>All Courses</h2>

      <div className="course-list">
        {courses.map((course) => (
          <Link key={course.id} to={`/courses/${course.id}`} className="course-item">
            {course.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
