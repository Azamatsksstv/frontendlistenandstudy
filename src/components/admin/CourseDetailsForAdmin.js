import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {Button} from "react-bootstrap";
import BASE_URL from "../config";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/dashboard/courses/${courseId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Передаем токен в хедере для аутентификации
          },
        });
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleDeleteCourse = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Send the delete request to the specified URL
      await axios.delete(
        `${BASE_URL}/api/v1/dashboard/courses/${courseId}/delete/`
      );

      // Handle the successful deletion (e.g., redirect to another page or show a success message)
      // For this example, let's just go back to the course list page.
      alert('Successfully deleted')
      window.location.href = `/courses-admin`;
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
  const handleChangeCourse = async () => {
    try {
      window.location.href = `/courses-admin/${courseId}/change`;
    } catch (error) {
      console.error('Error changing course:', error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const { title, description, teacher } = course;

  return (
    <div style={styles.container}>
      <p style={styles.title}>Course Details</p>
      <p style={styles.description}>Course title: {title}</p>
      <p style={styles.description}>Course description: {description}</p>
      <p style={styles.description}>Teacher: {teacher.first_name} {teacher.last_name}</p>
      <div style={styles.buttonContainer}>
        <Button style={styles.changeButton} onClick={handleChangeCourse}>Change</Button>
        <Button style={styles.joinButton} onClick={handleDeleteCourse} >Delete</Button>

      </div>

    </div>
  );
};

const styles = {
  container: {
    maxHeight: '500px',
    overflowY: 'auto',
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
  changeButton:{
    marginRight: '10px',
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#a07916',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
    border: 'none',
  },
  joinButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#a01616',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '15px',
    border: 'none',
  },
};

export default CourseDetails;
