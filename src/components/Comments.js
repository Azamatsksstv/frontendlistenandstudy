import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/comments/'); // Замените URL на ваш эндпоинт для получения комментариев
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>Comment: {comment.content}</p>
          <p>By: {comment.user.username}</p>
          <p>Lesson: {comment.lesson.title}</p>
          {comment.parent && (
            <p>Reply to: {comment.parent.user.username}</p>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Comments;
