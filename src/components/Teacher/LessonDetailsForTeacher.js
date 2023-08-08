import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import BASE_URL from "../config";

const LessonDetailsForTeacher = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(
          `${BASE_URL}/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/`
        );
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

  const handleDeleteLesson = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Send the delete request to the specified URL
      await axios.delete(
        `${BASE_URL}/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/delete/`
      );

      // Handle the successful deletion (e.g., redirect to another page or show a success message)
      // For this example, let's just go back to the course list page.
      alert('Successfully deleted')
      window.location.href = `/my-teaching-courses/${courseId}/lessons`;
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleChangeLesson = async () => {
    try {
      window.location.href = `/my-teaching-courses/${courseId}/lessons/${lessonId}/change`;
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      <p>{lesson.content}</p>
      {/* Здесь вы можете отображать другие данные урока */}
      <audio controls>
        {/* Укажите URL аудиофайла */}
        <source src={`${BASE_URL}${lesson.audio}`} type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </audio>
      <div style={styles.buttonContainer}>
        {/* Add the onClick event handler for the Delete button */}
        <Button style={styles.changeButton} onClick={handleChangeLesson}>Change</Button>
        <Button style={styles.joinButton} onClick={handleDeleteLesson}>Delete</Button>

      </div>
    </div>
  );
};

const styles = {
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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default LessonDetailsForTeacher;
