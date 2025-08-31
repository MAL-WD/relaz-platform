@@ .. @@
import React from 'react';
-import { Link, Outlet } from 'react-router-dom';
+import { Link, Outlet, useLocation } from 'react-router-dom';
import policy from '../data/rights.avif';
@@ .. @@
import { Header, Category,NewCourse } from '../components';
import HistoryNavigation from '../components/HistoryNavigation';
+import DynamicCategory from './DynamicCategory';

const Courses = () => {
+  const location = useLocation();
   const editing = { allowDeleting: true, allowEditing: true };
+  
+  // If we're on a nested route, show the dynamic category component
+  if (location.pathname !== '/Courses') {
+    return <DynamicCategory />;
+  }

   return (