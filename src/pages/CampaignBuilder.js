import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

function CampaignBuilder() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [segments, setSegments] = useState([]);
  const [templates, setTemplates] = useState([
    { type: 'email', subject: '', body: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const response = await axios.get('/api/segments');
      setSegments(response.data);
    } catch (error) {
      console.error('Error fetching segments:', error);
      setError('Failed to load segments. Please try again later.');
    }
  };

  const addTemplate = () => {
    setTemplates([...templates, { type: 'email', subject: '', body: '' }]);
  };

  const removeTemplate = (index) => {
    setTemplates(templates.filter((_, i) => i !== index));
  };

  const updateTemplate = (index, field, value) => {
    const newTemplates = [...templates];
    newTemplates[index][field] = value;
    setTemplates(newTemplates);
  };

  const handleSegmentChange = (segmentId) => {
    setSelectedSegments(prev => {
      if (prev.includes(segmentId)) {
        return prev.filter(id => id !== segmentId);
      } else {
        return [...prev, segmentId];
      }
    });
  };

  const saveCampaign = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post('/api/campaigns', {
        name,
        description,
        segments: selectedSegments,
        templates
      });
      navigate('/campaigns');
    } catch (error) {
      console.error('Error saving campaign:', error);
      setError('Failed to save campaign. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <form onSubmit={saveCampaign} className="space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Target Segments</label>
              <div className="mt-2 space-y-2">
                {segments.map((segment) => (
                  <div key={segment._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`segment-${segment._id}`}
                      checked={selectedSegments.includes(segment._id)}
                      onChange={() => handleSegmentChange(segment._id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`segment-${segment._id}`} className="ml-2 block text-sm text-gray-900">
                      {segment.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Message Templates</h3>
                <button
                  type="button"
                  onClick={addTemplate}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                  Add Template
                </button>
              </div>

              {templates.map((template, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">Template {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeTemplate(index)}
                      className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={template.type}
                      onChange={(e) => updateTemplate(index, 'type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="email">Email</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>

                  {template.type === 'email' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <input
                        type="text"
                        value={template.subject}
                        onChange={(e) => updateTemplate(index, 'subject', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      value={template.body}
                      onChange={(e) => updateTemplate(index, 'body', e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CampaignBuilder; 