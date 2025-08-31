import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';

const AdminRoute = ({ children }) => {
  const { userAuth } = useStateContext();

  // Check if user is authenticated and is a teacher (admin)
  if (!userAuth.access_token) {
    return <Navigate to="/Sign-in" replace />;
  }

  if (!userAuth.isTeacher) {
    return (
      <div className="mt-20 px-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
            Access Denied
          </h2>
          <p className="text-red-600 dark:text-red-300">
            You need teacher/admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminRoute;