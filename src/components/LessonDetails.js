import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LessonDetails = () => {
  const { courseId, lessonId } = useParams(); // Получите courseId и lessonId из URL с помощью хука useParams
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    // Функция для получения данных урока с Django backend
    const fetchLesson = async () => {
      try {
          const token = localStorage.getItem('accessToken');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


        const response = await axios.get(`http://127.0.0.1:8000/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/`);
        setLesson(response.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

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
        <source src={`http://127.0.0.1:8000${lesson.audio}`} type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </audio>
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

export default LessonDetails;
