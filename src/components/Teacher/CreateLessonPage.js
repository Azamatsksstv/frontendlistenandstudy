import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from "../config";

const CreateLessonPage = ({ history }) => {
  const { courseId } = useParams(); // Извлекаем courseId из параметров маршрута
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    content: '',
    audio: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setLessonData((prevState) => ({ ...prevState, audio: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken'); // Получите токен из localStorage или другого источника
      const formData = new FormData();
      formData.append('title', lessonData.title);
      formData.append('description', lessonData.description);
      formData.append('content', lessonData.content);
      formData.append('audio', lessonData.audio);

      const response = await axios.post(
        `${BASE_URL}/api/v1/dashboard/courses/${courseId}/lessons/create/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Добавьте токен в заголовок запроса
          },
        }
      );

      // Обработка успешного создания урока (например, показать сообщение об успехе)
      console.log('Урок успешно создан');

      // Перенаправление на страницу со списком уроков для конкретного курса
      // Вы можете изменить URL в соответствии со структурой вашего приложения
      // Например, если у вас есть компонент LessonsOfCourse для отображения списка уроков, URL может быть таким:
      alert('Successfully created')
      window.location.href = `/my-teaching-courses/${courseId}/lessons`;
      // history.push(`/my-teaching-courses/${courseId}/lessons`);
    } catch (error) {
      console.error('Ошибка при создании урока:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={lessonData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={lessonData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={lessonData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="audio">Audio:</label>
          <input type="file" id="audio" name="audio" onChange={handleFileChange} required />
        </div>

        <button style={styles.createButton} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#93c994',
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formGroup: {
    marginBottom: '15px',
  },
  createButton: {
    padding: '10px 20px',
    backgroundColor: '#0dc910',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default CreateLessonPage;
