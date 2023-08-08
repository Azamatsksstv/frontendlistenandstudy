import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from "../config";

const CreateCourse = ({ history }) => {
  const { courseId } = useParams(); // Извлекаем courseId из параметров маршрута
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


        // Загружаем список пользователей-учителей из базы данных
        const teachersResponse = await axios.get(
          `${BASE_URL}/api/v1/teachers/` // Замените на URL вашего API для получения списка учителей
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
      const token = localStorage.getItem('accessToken'); // Получите токен из localStorage или другого источника
      const formData = new FormData();
      formData.append('title', courseData.title);
      formData.append('description', courseData.description);
      formData.append('teacher', courseData.teacher);

      const response = await axios.post(
        `${BASE_URL}/api/v1/dashboard/courses/create/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Добавьте токен в заголовок запроса
          },
        }
      );

      // Обработка успешного создания урока (например, показать сообщение об успехе)
      console.log('Курс успешно создан');

      // Перенаправление на страницу со списком уроков для конкретного курса
      // Вы можете изменить URL в соответствии со структурой вашего приложения
      // Например, если у вас есть компонент LessonsOfCourse для отображения списка уроков, URL может быть таким:
      alert('Successfully created')
      window.location.href = `/courses-admin`;
      // history.push(`/my-teaching-courses/${courseId}/lessons`);
    } catch (error) {
      console.error('Ошибка при создании курса:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
          />
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

export default CreateCourse;
