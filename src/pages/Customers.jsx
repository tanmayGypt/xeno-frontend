import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minSpent: '',
    maxSpent: '',
    lastVisit: '',
    tags: []
  });

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, filters]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/customers', {
        params: {
          search: searchTerm,
          ...filters
        }
      });
      setCustomers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch customers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`/api/customers/${id}`);
        setCustomers(customers.filter(customer => customer._id !== id));
      } catch (err) {
        setError('Failed to delete customer');
        console.error(err);
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagSelect = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="toast toast-error">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="card mb-4">
        <div className="form-group">
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
            <MagnifyingGlassIcon
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1.25rem',
                height: '1.25rem',
                color: 'var(--text-light)'
              }}
            />
          </div>
        </div>

        <div className="grid grid-4">
          <div className="form-group">
            <label className="form-label">Min Spent</label>
            <input
              type="number"
              name="minSpent"
              value={filters.minSpent}
              onChange={handleFilterChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Max Spent</label>
            <input
              type="number"
              name="maxSpent"
              value={filters.maxSpent}
              onChange={handleFilterChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Visit</label>
            <input
              type="date"
              name="lastVisit"
              value={filters.lastVisit}
              onChange={handleFilterChange}
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
                    checked={filters.tags.includes(tag)}
                    onChange={() => handleTagSelect(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-3">
        {customers.map(customer => (
          <div key={customer._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{customer.name}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link
                  to={`/customers/edit/${customer._id}`}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem' }}
                >
                  <PencilIcon style={{ width: '1rem', height: '1rem' }} />
                </Link>
                <button
                  onClick={() => deleteCustomer(customer._id)}
                  className="btn"
                  style={{ padding: '0.5rem', backgroundColor: 'var(--error)', color: 'white' }}
                >
                  <TrashIcon style={{ width: '1rem', height: '1rem' }} />
                </button>
              </div>
            </div>
            <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>{customer.email}</p>
            <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>{customer.phone}</p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              {customer.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Link to="/customers/new" className="btn btn-primary" style={{ marginTop: '2rem' }}>
        Add New Customer
      </Link>
    </div>
  );
}

export default Customers; 