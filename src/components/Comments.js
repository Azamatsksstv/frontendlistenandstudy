import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './Comments.css';
import BASE_URL from "./config";

const Comment = ({ comment }) => {
  const { courseId, lessonId } = useParams(); // Получите courseId и lessonId из URL с помощью хука useParams
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value);
  };
  const handleReplySubmit = async () => {
    try {
      const response = await axios.post(`http://52.87.238.183/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/comments/`, {
        content: replyContent,
        parent: comment.id, // Указываем родительский комментарий
      }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Передаем токен в хедере для аутентификации
          },
      });
      // Обновляем состояние, чтобы показать новый ответ
      // Скрываем форму ответа после успешной отправки
      setShowReplyForm(false);
      setReplyContent('');
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };
  if (!comment) {
    // Если comment равен undefined или null, вернуть null или какое-либо другое содержимое по умолчанию
    return null;
  }

  return (
    <div style={{ marginLeft: '20px', marginTop: '12px' }}>
      {comment.user && comment.user.first_name && (
        <div>
          <span style={{backgroundColor: "#cecdcd", borderRadius: '3px', padding: '3px'}}>
            {comment.user.first_name}: {comment.content}
          </span>
          {/* Кнопка "Ответить" */}
          <button style={{marginLeft: 5}} onClick={() => setShowReplyForm(true)}>Reply</button>
        </div>
      )}

      {/* Форма ответа */}
      {showReplyForm && (
        <div style={{paddingTop: 5, paddingBottom: 10}}>
          <textarea
            value={replyContent}
            onChange={handleReplyChange}
            placeholder="Write your reply..."
          ></textarea>
          <button style={{marginLeft: 5}} onClick={handleReplySubmit}>Share</button>
        </div>
      )}

      {/* Рекурсивно отображаем ответы на данный комментарий */}
      {comment.replies && comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} />
      ))}
    </div>
  );
};

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { courseId, lessonId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/dashboard/courses/${courseId}/lessons/${lessonId}/comments/`, {
        content: newComment,
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <div>
      <h3 style={{paddingTop: '50px'}}>Comments</h3>
      <div className="panel">
        <div className="panel-body">
          <textarea
            className="form-control"
            cols="60"
            rows="4"
            placeholder="What are you thinking?"
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <div className="mar-top clearfix">
            <button className="btn btn-sm btn-primary pull-right" type="button" onClick={handleCommentSubmit}>
              <i className="fa fa-pencil fa-fw"></i> Share
            </button>
          </div>
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment}/>
      ))}
    </div>
  );
};

export default Comments;
