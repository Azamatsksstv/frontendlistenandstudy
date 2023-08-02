import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseListStyle from '../CourseListStyle.css'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

const CoursesForAdmin = () => {
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
      <h2>All Courses for admin</h2>
<div className="create-lesson-button" style={styles.buttonContainer}>
        {/* Link the button to the page where you can create a new lesson */}
        <Link to={`/courses-admin/create`} style={{ textDecoration: 'none' }}>
          <Button style={styles.createButton} variant="primary">Create Course</Button>
        </Link>
      </div>
      <div className="course-list">
        {courses.map((course) => (
          <Link key={course.id} to={`/courses-admin/${course.id}`} className="course-item">
            {course.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#0dc910',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default CoursesForAdmin;
