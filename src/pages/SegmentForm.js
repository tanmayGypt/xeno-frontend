import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SegmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    criteria: {
      minSpent: '',
      maxSpent: '',
      lastVisit: '',
      tags: []
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSegment();
    }
  }, [id]);

  const fetchSegment = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/segments/${id}`);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch segment data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('criteria.')) {
      const criteriaField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        criteria: {
          ...prev.criteria,
          [criteriaField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTagChange = (tag) => {
    setFormData(prev => ({
      ...prev,
      criteria: {
        ...prev.criteria,
        tags: prev.criteria.tags.includes(tag)
          ? prev.criteria.tags.filter(t => t !== tag)
          : [...prev.criteria.tags, tag]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axios.put(`/api/segments/${id}`, formData);
      } else {
        await axios.post('/api/segments', formData);
      }
      navigate('/segments');
    } catch (err) {
      setError('Failed to save segment');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="card">
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
        {id ? 'Edit Segment' : 'Create New Segment'}
      </h2>

      {error && (
        <div className="toast toast-error mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Segment Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Minimum Spent</label>
            <input
              type="number"
              name="criteria.minSpent"
              value={formData.criteria.minSpent}
              onChange={handleChange}
              className="form-input"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Maximum Spent</label>
            <input
              type="number"
              name="criteria.maxSpent"
              value={formData.criteria.maxSpent}
              onChange={handleChange}
              className="form-input"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Last Visit</label>
            <input
              type="date"
              name="criteria.lastVisit"
              value={formData.criteria.lastVisit}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="grid grid-2">
              {['VIP', 'Regular', 'New'].map(tag => (
                <label key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.criteria.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">
            {id ? 'Update Segment' : 'Create Segment'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/segments')}
            className="btn"
            style={{ backgroundColor: 'var(--text-light)', color: 'white' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SegmentForm; 