import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Импортируем компонент Link

const LessonsOfCourse = () => {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/dashboard/courses/${courseId}/lessons/`);
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
            <div className="course-list">
      {lessons.map((lesson) => (
        <Link key={lesson.id}
              to={`/my-courses/${courseId}/lessons/${lesson.id}`}
              style={{ textDecoration: 'none' }}
              className="course-item"
        >
              {lesson.title}
        </Link>
      ))}</div>
    </div>
  );
};

export default LessonsOfCourse;
