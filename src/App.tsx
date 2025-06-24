import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import HRDashboard from './pages/HRDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Departments from './pages/Departments';
import DepartmentDetail from './pages/DepartmentDetail';
import Employees from './pages/Employees';

// Protected route component
const ProtectedRoute: React.FC<{ 
  element: React.ReactNode; 
  allowedRoles?: string[]
}> = ({ element, allowedRoles }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{element}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <Layout>
              <ProtectedRoute 
                element={
                  <RoleBasedDashboard />
                } 
              />
            </Layout>
          } />
          
          <Route path="/departments" element={
            <Layout>
              <ProtectedRoute 
                element={<Departments />} 
                allowedRoles={['hr_manager']}
              />
            </Layout>
          } />
          
          <Route path="/departments/:id" element={
            <Layout>
              <ProtectedRoute 
                element={<DepartmentDetail />} 
                allowedRoles={['hr_manager']}
              />
            </Layout>
          } />
          
          <Route path="/employees" element={
            <Layout>
              <ProtectedRoute 
                element={<Employees />} 
                allowedRoles={['hr_manager']}
              />
            </Layout>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Component to render the appropriate dashboard based on user role
const RoleBasedDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (currentUser?.role === 'hr_manager') {
    return <HRDashboard />;
  }
  
  return <EmployeeDashboard />;
};

export default App;