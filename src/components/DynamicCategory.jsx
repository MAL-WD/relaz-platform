import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import HistoryNavigation from './HistoryNavigation';
import { Header, Category } from '.';
import AnimationWrapper from './AnimationWrapper';
import CourseCard from './CourseCard';
import NoDataMsg from './NoDataMsg';
import axios from 'axios';
import EditSvg from '../components svgs/EditSvg';
import DeleteSvg from '../components svgs/DeleteSvg';

const DynamicCategory = () => {
  const { userAuth, currentColor } = useStateContext();
  const location = useLocation();
  const [categoryData, setCategoryData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin/teacher
    setIsAdmin(userAuth.isTeacher || userAuth.access_token);
    fetchCategoryData();
    fetchCourses();
  }, [location.pathname]);

  const fetchCategoryData = async () => {
    try {
      // Mock category data based on current path
      const pathSegments = location.pathname.split('/').filter(Boolean);
      const categoryName = pathSegments[pathSegments.length - 1]?.replace(/-/g, ' ');
      
      setCategoryData({
        name: categoryName || 'Category',
        description: `Courses and subcategories for ${categoryName}`,
        path: location.pathname,
        level: pathSegments.length - 1
      });

      // Mock subcategories based on current path
      const mockSubcategories = generateMockSubcategories(location.pathname);
      setSubcategories(mockSubcategories);
      
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/search-courses`,
        { category: location.pathname }
      );
      setCourses(response.data.courses || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  const generateMockSubcategories = (currentPath) => {
    // This would normally come from your database
    const subcategoryMap = {
      '/Courses/Rights-and-Political': [
        { name: 'Rights', path: '/Courses/Rights-and-Political/Rights' },
        { name: 'Political Science', path: '/Courses/Rights-and-Political/Political-Science' }
      ],
      '/Courses/Rights-and-Political/Rights': [
        { name: 'Licence', path: '/Courses/Rights-and-Political/Rights/Licence' },
        { name: 'Master', path: '/Courses/Rights-and-Political/Rights/Master' }
      ],
      '/Courses/Rights-and-Political/Rights/Licence': [
        { name: 'Scole Commun', path: '/Courses/Rights-and-Political/Rights/Licence/Scole-commun' },
        { name: 'General Law', path: '/Courses/Rights-and-Political/Rights/Licence/general-law' },
        { name: 'Private Law', path: '/Courses/Rights-and-Political/Rights/Licence/private-law' }
      ]
    };

    return subcategoryMap[currentPath] || [];
  };

  const handleDeleteSubcategory = (subcategoryPath) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;
    
    setSubcategories(subcategories.filter(sub => sub.path !== subcategoryPath));
    toast.success('Subcategory deleted successfully!');
  };

  const AdminControls = () => {
    if (!isAdmin) return null;

    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200">Admin Controls</h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-300">Manage this category and its content</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/admin/courses"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Manage All
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="mt-20 px-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl text-black dark:text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <AnimationWrapper>
      <div className="mt-20 px-6 rounded-3xl">
        <HistoryNavigation />
        <Header 
          route={location.pathname} 
          title={categoryData?.name || 'Category'} 
        />

        <AdminControls />

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-black dark:text-white mb-4">Subcategories</h2>
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              {subcategories.map((subcategory, index) => (
                <div key={index} className="relative group">
                  <Category
                    link={subcategory.path}
                    ImgTitle={subcategory.name}
                    CatTitle={subcategory.name}
                    CatCourses="0"
                  />
                  {isAdmin && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => handleDeleteSubcategory(subcategory.path)}
                        className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        title="Delete Subcategory"
                      >
                        <DeleteSvg fill="white" className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses */}
        <div className="bg-white dark:bg-secondary-dark rounded-3xl p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-black dark:text-white">Courses</h2>
            {isAdmin && (
              <Link
                to="/Courses/CreateCourse"
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: currentColor }}
              >
                Add Course
              </Link>
            )}
          </div>

          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {courses.length ? (
              courses.map((course, i) => (
                <div key={i} className="relative group">
                  <AnimationWrapper transition={{ duration: 1, delay: i * 0.1 }}>
                    <CourseCard course={course} />
                  </AnimationWrapper>
                  {isAdmin && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => {
                          // Navigate to edit course
                          window.location.href = `/editor/course/${course.course_id}`;
                        }}
                        className="p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        title="Edit Course"
                      >
                        <EditSvg fill="white" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        title="Delete Course"
                      >
                        <DeleteSvg fill="white" className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <NoDataMsg message="No courses available in this category" />
            )}
          </div>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default DynamicCategory;