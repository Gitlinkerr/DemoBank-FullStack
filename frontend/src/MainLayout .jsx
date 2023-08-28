import React from 'react'; 
import { useLocation, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import PdfUploadPage from './components/PdfUploadPage';
import AccountSettings from './components/AccountSettings';
import VerticalNavbar from './components/VerticalNavbar';
import './MainLayout.css';
import AdminDashboard from './components/admin/AdminDashboard';
import Comment from './components/Comment';
import DownloadFilesPage from './components/admin/DownloadFilesPage';


export const MainLayout = () => {
  const location = useLocation();
  const showNavbar = !["/loginPage", "/", "/signup"].includes(location.pathname);

  return (
    <div className="app-layout">
      {showNavbar && <VerticalNavbar />}
      <div className="content-container">
        <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pdf-upload" element={<PdfUploadPage />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/download-files" element={<DownloadFilesPage />} />
        </Routes>
      </div>
    </div>
  );
};
