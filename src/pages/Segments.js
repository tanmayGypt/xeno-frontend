import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

const mockSegments = [
  {
    _id: '1',
    name: 'High Value Customers',
    description: 'Customers who spent more than $1000',
    criteria: { totalSpent: '> 1000' },
    customerCount: 24
  },
  {
    _id: '2',
    name: 'Recent Visitors',
    description: 'Customers who visited in the last 30 days',
    criteria: { lastVisit: 'within 30 days' },
    customerCount: 15
  },
  {
    _id: '3',
    name: 'Email Subscribers',
    description: 'Customers who subscribed to email updates',
    criteria: { tags: 'subscribed' },
    customerCount: 40
  }
];

function Segments() {
  const [segments, setSegments] = useState(mockSegments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/segments')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSegments(data);
        } else if (Array.isArray(data.segments)) {
          setSegments(data.segments);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError('Could not fetch segments. Showing mock data.');
        setSegments(mockSegments);
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Segments</h1>
        <Link to="/segments/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusIcon className="w-5 h-5" /> New Segment
        </Link>
      </div>
      {error && <div className="login-error" style={{ marginBottom: '1rem' }}>{error}</div>}
      {loading ? (
        <div className="loading-spinner" />
      ) : (
        <div className="grid grid-3">
          {segments.map(segment => (
            <div className="card" key={segment._id} style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{segment.name}</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>{segment.description}</p>
                {segment.criteria && (
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>
                    <strong>Criteria:</strong>
                    <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
                      {Object.entries(segment.criteria).map(([key, value]) => (
                        <li key={key}>{key}: {value}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                <span className="badge badge-success">{segment.customerCount || 0} customers</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/segments/${segment._id}`} className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.3rem 0.8rem' }}>Edit</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Segments; 