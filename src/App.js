import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Campaigns from './pages/Campaigns';
import Segments from './pages/Segments';
import CustomerForm from './pages/CustomerForm';
import CampaignForm from './pages/CampaignForm';
import SegmentForm from './pages/SegmentForm';
import './styles/main.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/new" element={<CustomerForm />} />
        <Route path="customers/:id" element={<CustomerForm />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="campaigns/new" element={<CampaignForm />} />
        <Route path="campaigns/:id" element={<CampaignForm />} />
        <Route path="segments" element={<Segments />} />
        <Route path="segments/new" element={<SegmentForm />} />
        <Route path="segments/:id" element={<SegmentForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;