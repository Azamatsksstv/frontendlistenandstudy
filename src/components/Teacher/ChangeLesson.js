import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChangeLesson = () => {
  const { courseId, lessonId } = useParams();
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    content: '',
    audio: null,
  });

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/`
        );
        setLessonData(response.data);
      } catch (error) {
        console.error('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    setLessonData((prevState) => ({ ...prevState, audio: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const formData = new FormData();
      formData.append('title', lessonData.title);
      formData.append('description', lessonData.description);
      formData.append('content', lessonData.content);
      formData.append('audio', lessonData.audio);

      await axios.put(
        `http://127.0.0.1:8000/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/change/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Lesson updated successfully');
      alert('Successfully changed');
      window.location.href = `/my-teaching-courses/${courseId}/lessons/${lessonId}`;
    } catch (error) {
      console.error('Error updating lesson:', error);
    }
  };

  if (!lessonData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Change Lesson</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={lessonData.title} onChange={handleChange} required />
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
          <textarea id="content" name="content" value={lessonData.content} onChange={handleChange} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="audio">Audio:</label>
          <input type="file" id="audio" name="audio" onChange={handleAudioChange} />
          {/*{lessonData.audio && <p style={{fontSize: '12px'}}>Selected audio: {lessonData.audio}</p>}*/}
        </div>

        <button style={styles.updateButton}  type="submit">Update</button>
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

export default ChangeLesson;
