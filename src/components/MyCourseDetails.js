import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {Button} from "react-bootstrap";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/dashboard/courses/${courseId}/`, {
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
      <Link to={`/my-courses/${courseId}/lessons`}
            style={styles.joinButton}>
          Lessons
      </Link>


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
  joinButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#16a085',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    // transition: 'background-color 0.3s ease',
    // marginLeft: '25px',
    marginTop: '15px',
  },
};

export default CourseDetails;
