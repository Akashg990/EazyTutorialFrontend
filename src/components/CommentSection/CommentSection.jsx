import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './CommentSection.css';

const CommentSection = ({ courseId, courseAuthorId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  
  // Check if the currently logged-in user is the author of the course
  const isAuthor = user?._id === courseAuthorId;

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${courseId}/comments`);
      const data = await response.json();
      if (response.ok) {
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`/api/courses/${courseId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ text: newComment }),
      });

      const data = await response.json();
      if (response.ok) {
        setComments(data); // The backend returns the new full list of comments
        setNewComment(''); // Clear the textarea
      } else {
        alert(data.message || "Failed to post comment");
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await fetch(`/api/courses/${courseId}/comments/${commentId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${user.token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setComments(data); // Update with the new list of comments
        } else {
          alert(data.message || "Failed to delete comment");
        }
      } catch (error) {
        console.error("Failed to delete comment", error);
      }
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments ({comments.length})</h3>
      {isAuthenticated && (
        <form onSubmit={handleSubmit} className="comment-form">
          <img 
            src={`https://i.pravatar.cc/40?u=${user?._id}`} 
            alt="Your avatar" 
            className="comment-avatar"
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows="1"
            required
          ></textarea>
          <button type="submit" className="submit-comment-btn">Comment</button>
        </form>
      )}
      <div className="comment-list">
        {loading ? (
          <p>Loading comments...</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <img 
                src={`https://i.pravatar.cc/40?u=${comment.user}`} 
                alt={`${comment.userName}'s avatar`}
                className="comment-avatar" 
              />
              <div className="comment-content">
                <div className="comment-header">
                  <span className="comment-author">{comment.userName}</span>
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-text">{comment.text}</p>
              </div>
              {isAuthor && (
                <button onClick={() => handleDelete(comment._id)} className="delete-comment-btn" title="Delete comment">
                  🗑️
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;