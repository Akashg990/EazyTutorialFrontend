import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CreateCoursePage.css'; // Re-using the same styles

const API = process.env.REACT_APP_API_URL || '';

const EditCoursePage = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [sections, setSections] = useState([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch existing course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API}/api/courses/${courseId}`);
        if (!res.ok) throw new Error('Failed to fetch course data.');
        const data = await res.json();

        setTitle(data.title);
        setCategory(data.category);
        setPrice(data.price);
        setImage(data.image);
        setSections(data.sections || [{ sectionId: `section-1`, title: '', description: '', videoUrl: '' }]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  // --- Section Handlers ---
  const handleSectionChange = (index, event) => {
    const newSections = sections.map((sec, i) =>
      i === index ? { ...sec, [event.target.name]: event.target.value } : sec
    );
    setSections(newSections);
  };
  const addSection = () => {
    setSections([...sections, { sectionId: `section-${Date.now()}`, title: '', description: '', videoUrl: '' }]);
  };
  const removeSection = (index) => setSections(sections.filter((_, i) => i !== index));

  // --- Cloudinary Upload Widget ---
  const openUploadWidget = (callback) => {
    const cloudName = 'YOUR_CLOUD_NAME'; // Replace with your Cloud Name
    const uploadPreset = 'YOUR_UPLOAD_PRESET'; // Replace with your Upload Preset

    if (!cloudName || !uploadPreset) {
      setError('Please configure Cloudinary credentials first.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      { cloudName, uploadPreset },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          callback(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  const handleSectionVideoUpload = (index) => {
    openUploadWidget((url) => {
      const newSections = [...sections];
      newSections[index].videoUrl = url;
      setSections(newSections);
    });
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API}/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ title, category, price: Number(price), image, sections })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update course');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container" style={{ padding: '40px' }}>Loading course for editing...</div>;
  if (error) return <div className="container" style={{ padding: '40px' }}>Error: {error}</div>;

  return (
    <main className="create-course-page container">
      <div className="form-container">
        <h1>Edit Your Course</h1>
        <form onSubmit={handleSubmit}>
          {/* Course Details */}
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Course Image</label>
            <button type="button" className="upload-btn" onClick={() => openUploadWidget(setImage)}>
              Upload New Image
            </button>
            {image && <img src={image} alt="Course preview" className="image-preview" />}
          </div>

          <hr className="form-divider" />

          {/* Sections */}
          <h2>Course Sections</h2>
          {sections.map((section, index) => (
            <div key={index} className="section-form-group">
              <h4>Section {index + 1}</h4>
              <input type="text" name="title" placeholder="Section Title" value={section.title} onChange={(e) => handleSectionChange(index, e)} required />
              <textarea name="description" placeholder="Section Description" value={section.description} onChange={(e) => handleSectionChange(index, e)} required />
              <button type="button" className="upload-btn" onClick={() => handleSectionVideoUpload(index)}>Upload Section Video</button>
              {section.videoUrl && <p className="upload-success-msg">Video uploaded successfully!</p>}
              <button type="button" className="remove-lesson-btn" onClick={() => removeSection(index)}>Remove Section</button>
            </div>
          ))}
          <button type="button" className="add-lesson-btn" onClick={addSection}>+ Add Another Section</button>

          <hr className="form-divider" />

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditCoursePage;
