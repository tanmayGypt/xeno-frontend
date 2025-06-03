import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  MegaphoneIcon,
  TagIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

function Layout() {
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Dashboard' },
    { path: '/customers', icon: UserGroupIcon, label: 'Customers' },
    { path: '/campaigns', icon: MegaphoneIcon, label: 'Campaigns' },
    { path: '/segments', icon: TagIcon, label: 'Segments' }
  ];

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="layout">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-surface shadow-md"
        onClick={toggleNav}
      >
        {isNavOpen ? (
          <XMarkIcon className="w-6 h-6 text-text" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-text" />
        )}
      </button>

      <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
        <div className="nav-header">
          <Link to="/" className="nav-logo">
            Xeno CRM
          </Link>
        </div>
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setIsNavOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          <Link 
            to="/login" 
            className="nav-link mt-auto"
            onClick={() => setIsNavOpen(false)}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout; 