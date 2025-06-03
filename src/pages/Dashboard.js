import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  UserGroupIcon,
  MegaphoneIcon,
  TagIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

function Dashboard() {
  const [metrics, setMetrics] = useState([
    {
      name: 'Total Customers',
      value: 1234,
      icon: UserGroupIcon,
      color: 'var(--primary)'
    },
    {
      name: 'Active Campaigns',
      value: 5,
      icon: MegaphoneIcon,
      color: 'var(--success)'
    },
    {
      name: 'Segments',
      value: 12,
      icon: TagIcon,
      color: 'var(--warning)'
    },
    {
      name: 'Revenue',
      value: '$45,678',
      icon: CurrencyDollarIcon,
      color: 'var(--primary-dark)'
    }
  ]);

  const [recentCampaigns, setRecentCampaigns] = useState([
    {
      id: 1,
      name: 'Summer Sale',
      status: 'Active',
      segment: 'High Value',
      sent: 500,
      delivered: 480,
      opened: 320
    },
    {
      id: 2,
      name: 'Product Launch',
      status: 'Scheduled',
      segment: 'Recent Visitors',
      sent: 0,
      delivered: 0,
      opened: 0
    }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch real data
        const [metricsResponse, campaignsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/dashboard/metrics'),
          axios.get('http://localhost:5000/api/campaigns?limit=5')
        ]);

        // If successful, update with real data
        if (metricsResponse.data) {
          setMetrics([
            {
              name: 'Total Customers',
              value: metricsResponse.data.totalCustomers.toLocaleString(),
              icon: UserGroupIcon,
              color: 'var(--primary)'
            },
            {
              name: 'Active Campaigns',
              value: metricsResponse.data.activeCampaigns.toString(),
              icon: MegaphoneIcon,
              color: 'var(--success)'
            },
            {
              name: 'Segments',
              value: metricsResponse.data.totalSegments.toString(),
              icon: TagIcon,
              color: 'var(--warning)'
            },
            {
              name: 'Revenue',
              value: `$${metricsResponse.data.revenue.toLocaleString()}`,
              icon: CurrencyDollarIcon,
              color: 'var(--primary-dark)'
            }
          ]);
        }

        if (campaignsResponse.data) {
          setRecentCampaigns(campaignsResponse.data.campaigns.map(campaign => ({
            id: campaign._id,
            name: campaign.name,
            status: campaign.status,
            segment: campaign.segment?.name || 'All Customers',
            sent: campaign.metrics?.sent || 0,
            delivered: campaign.metrics?.delivered || 0,
            opened: campaign.metrics?.opened || 0
          })));
        }
      } catch (error) {
        console.log('Using mock data due to API error:', error);
        // Keep using the mock data we initialized with
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>
      <div className="dashboard-cards">
        {metrics.map((stat) => {
          const Icon = stat.icon;
          return (
            <div className="dashboard-card" key={stat.name}>
              <Icon className="icon" style={{ color: stat.color }} />
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.name}</div>
            </div>
          );
        })}
      </div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Recent Campaigns</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Segment</th>
            <th>Sent</th>
            <th>Delivered</th>
            <th>Opened</th>
          </tr>
        </thead>
        <tbody>
          {recentCampaigns.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>{c.segment}</td>
              <td>{c.sent}</td>
              <td>{c.delivered}</td>
              <td>{c.opened}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard; 