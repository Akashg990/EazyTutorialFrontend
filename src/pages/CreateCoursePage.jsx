import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CreateCoursePage.css';

const CreateCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [sections, setSections] = useState([
    { sectionId: `section-1`, title: '', description: '', videoUrl: '' }
  ]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSectionChange = (index, event) => {
    const newSections = sections.map((section, i) => {
      if (index === i) {
        return { ...section, [event.target.name]: event.target.value };
      }
      return section;
    });
    setSections(newSections);
  };

  const addSection = () => {
    setSections([
      ...sections, 
      { sectionId: `section-${sections.length + 1}`, title: '', description: '', videoUrl: '' }
    ]);
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };
  
  const openUploadWidget = (callback) => {
    // =================================================================
    // ==> ATTENTION: YOU MUST EDIT THESE TWO LINES <==
    //
    // Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary Cloud Name.
    // Replace 'YOUR_UPLOAD_PRESET' with the Upload Preset name you created.
    //
    // Example:
    // const cloudName = 'dkpndytv';
    // const uploadPreset = 'my_course_preset';
    //
    const cloudName = 'dkjndytjv';
    const uploadPreset = 'my_course_preset';
    // =================================================================

    if (cloudName === 'YOUR_CLOUD_NAME' || uploadPreset === 'YOUR_UPLOAD_PRESET') {
      setError('Please configure Cloudinary credentials first.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget({ cloudName, uploadPreset },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!image) {
      setError('Please upload a course image.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, description, category, price: Number(price), image, sections }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to create course');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-course-page container">
      <div className="form-container">
        <h1>Create a New Course</h1>
        <form onSubmit={handleSubmit}>
          {/* Main Course Details */}
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Course Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
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
              Upload Main Image
            </button>
            {image && <img src={image} alt="Course preview" className="image-preview" />}
          </div>

          <hr className="form-divider" />

          {/* Dynamic Sections */}
          <h2>Course Sections</h2>
          {sections.map((section, index) => (
            <div key={index} className="section-form-group">
              <h4>Section {index + 1}</h4>
              <input
                type="text" name="title" placeholder="Section Title"
                value={section.title} onChange={(e) => handleSectionChange(index, e)} required
              />
              <textarea
                name="description" placeholder="Section Description"
                value={section.description} onChange={(e) => handleSectionChange(index, e)} required
              />
              <button type="button" className="upload-btn" onClick={() => handleSectionVideoUpload(index)}>
                Upload Section Video
              </button>
              {section.videoUrl && <p className="upload-success-msg">Video uploaded successfully!</p>}
              <button type="button" className="remove-lesson-btn" onClick={() => removeSection(index)}>
                Remove Section
              </button>
            </div>
          ))}
          <button type="button" className="add-lesson-btn" onClick={addSection}>
            + Add Another Section
          </button>

          <hr className="form-divider" />

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCoursePage;