import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from '../config';

const ChangeCourse = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    teacher: '', // Сюда будем сохранять ID выбранного учителя
  });
  const [teachers, setTeachers] = useState([]); // Здесь будем хранить список пользователей-учителей

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(
          `${BASE_URL}/api/v1/dashboard/courses/${courseId}/`
        );
        setCourseData(response.data);

        // Загружаем список пользователей-учителей из базы данных
        const teachersResponse = await axios.get(
          '${BASE_URL}/api/v1/teachers/' // Замените на URL вашего API для получения списка учителей
        , {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Передаем токен в хедере для аутентификации
          },
            });
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('teacher', courseData.teacher);

      await axios.put(
        `${BASE_URL}/api/v1/dashboard/courses/${courseId}/change/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Lesson updated successfully');
      alert('Successfully changed');
      window.location.href = `/courses-admin/${courseId}`;
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Change Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={courseData.title} onChange={handleChange} required />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
        <label htmlFor="teacher">Teacher:</label>
        <select
          id="teacher"
          name="teacher"
          value={courseData.teacher || ''} // Устанавливаем значение по умолчанию на основе прошлого учителя
          onChange={handleChange}
        >
          {/*{courseData.teacher ? (*/}
            <option value={courseData.teacher.id}>
              Select teacher:
            </option>
          {/*) : (*/}
          {/*  <option value="">Select new teacher</option>*/}
          {/*)}*/}
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.first_name} {teacher.last_name}
            </option>
          ))}
        </select>
      </div>
        <button style={styles.updateButton} type="submit">Update</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    backgroundColor: '#a8966b',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formGroup: {
    marginBottom: '15px',
  },
  updateButton: {
    padding: '10px 20px',
    backgroundColor: '#a07916',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default ChangeCourse;
