import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PencilIcon, TrashIcon, PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

function Campaigns() {
  const [campaigns, setCampaigns] = useState([
    {
      _id: '1',
      name: 'Summer Sale Campaign',
      type: 'email',
      status: 'active',
      segment: 'High-Value Customers',
      message: 'Get 50% off on summer collection!',
      metrics: {
        sent: 250,
        delivered: 245,
        opened: 180
      }
    },
    {
      _id: '2',
      name: 'New Product Launch',
      type: 'sms',
      status: 'scheduled',
      segment: 'All Customers',
      message: 'Check out our new product line!',
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0
      }
    },
    {
      _id: '3',
      name: 'Customer Feedback',
      type: 'email',
      status: 'draft',
      segment: 'Recent Purchasers',
      message: 'How was your shopping experience?',
      metrics: {
        sent: 0,
        delivered: 0,
        opened: 0
      }
    }
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaigns');
        if (response.data && response.data.campaigns) {
          const formattedCampaigns = response.data.campaigns.map(campaign => ({
            ...campaign,
            segment: typeof campaign.segment === 'object' ? campaign.segment.name : campaign.segment
          }));
          setCampaigns(formattedCampaigns);
        }
      } catch (error) {
        console.log('Using mock data due to API error:', error);
        // Keep using the mock data we initialized with
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
        <Link
          to="/campaigns/new"
          className="btn btn-primary"
        >
          Create Campaign
        </Link>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metrics</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{campaign.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.segment}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{campaign.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>Sent: {campaign.metrics.sent}</span>
                      <span>Delivered: {campaign.metrics.delivered}</span>
                      <span>Opened: {campaign.metrics.opened}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link
                        to={`/campaigns/${campaign._id}`}
                        className="text-primary hover:text-primary-dark"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
                      {campaign.status === 'active' ? (
                        <button className="text-yellow-600 hover:text-yellow-800">
                          <PauseIcon className="w-5 h-5" />
                        </button>
                      ) : (
                        <button className="text-green-600 hover:text-green-800">
                          <PlayIcon className="w-5 h-5" />
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-800">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Campaigns; 