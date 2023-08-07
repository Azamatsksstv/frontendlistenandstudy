import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LessonsOfCourseForTeacher = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/dashboard/courses/${courseId}/lessons/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Передаем токен в хедере для аутентификации
          },
        });
        setLessons(response.data.lessons);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, [courseId]);

  return (
    <div className="course-list-container">
      <h2>Lessons</h2>
      <div className="create-lesson-button" style={styles.buttonContainer}>
        {/* Link the button to the page where you can create a new lesson */}
        <Link to={`/my-teaching-courses/${courseId}/lessons/create`} style={{ textDecoration: 'none' }}>
          <Button style={styles.createButton} variant="primary">Create Lesson</Button>
        </Link>
      </div>
      <div className="course-list">
        {lessons.map((lesson) => (
          <Link
            key={lesson.id}
            to={`/my-teaching-courses/${courseId}/lessons/${lesson.id}`}
            style={{ textDecoration: 'none' }}
            className="course-item"
          >
            {lesson.title}
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

export default LessonsOfCourseForTeacher;
