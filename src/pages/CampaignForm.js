import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CampaignForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'email',
    status: 'draft',
    startDate: '',
    endDate: '',
    targetSegment: '',
    budget: '',
    metrics: {
      opens: 0,
      clicks: 0,
      conversions: 0
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    fetchSegments();
    if (id) {
      fetchCampaign();
    }
  }, [id]);

  const fetchSegments = async () => {
    try {
      const response = await axios.get('/api/segments');
      setSegments(response.data);
    } catch (err) {
      console.error('Failed to fetch segments:', err);
    }
  };

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/campaigns/${id}`);
      setFormData(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch campaign data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (id) {
        await axios.put(`/api/campaigns/${id}`, formData);
      } else {
        await axios.post('/api/campaigns', formData);
      }
      navigate('/campaigns');
    } catch (err) {
      setError('Failed to save campaign');
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
        {id ? 'Edit Campaign' : 'Create New Campaign'}
      </h2>

      {error && (
        <div className="toast toast-error mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Campaign Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Campaign Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push Notification</option>
              <option value="social">Social Media</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Segment</label>
            <select
              name="targetSegment"
              value={formData.targetSegment}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a segment</option>
              {segments.map(segment => (
                <option key={segment._id} value={segment._id}>
                  {segment.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Budget</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="form-input"
              step="0.01"
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
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">
            {id ? 'Update Campaign' : 'Create Campaign'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/campaigns')}
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

export default CampaignForm; 