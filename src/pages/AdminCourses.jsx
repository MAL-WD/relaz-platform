import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import AnimationWrapper from '../components/AnimationWrapper';
import { Header } from '../components';
import toast, { Toaster } from 'react-hot-toast';
import CategoryManager from '../components/CategoryManager';
import CourseManager from '../components/CourseManager';
import AdminRoute from '../components/AdminRoute';

const AdminCourses = () => {
  const { userAuth, currentColor } = useStateContext();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('categories');

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      // Initialize with existing structure
      const initialCategories = [
        {
          _id: '1',
          name: 'Rights and Political Science',
          description: 'Legal and political studies',
          path: '/Courses/Rights-and-Political',
          parentId: null,
          level: 0,
          image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400',
          children: [
            {
              _id: '1-1',
              name: 'Rights',
              description: 'Legal studies and jurisprudence',
              path: '/Courses/Rights-and-Political/Rights',
              parentId: '1',
              level: 1,
              image: '',
              children: [
                {
                  _id: '1-1-1',
                  name: 'Licence',
                  description: 'Undergraduate legal studies',
                  path: '/Courses/Rights-and-Political/Rights/Licence',
                  parentId: '1-1',
                  level: 2,
                  image: '',
                  children: []
                }
              ]
            },
            {
              _id: '1-2',
              name: 'Political Science',
              description: 'Political theory and practice',
              path: '/Courses/Rights-and-Political/Political-Science',
              parentId: '1',
              level: 1,
              image: '',
              children: []
            }
          ]
        },
        {
          _id: '2',
          name: 'Sciences Exactes',
          description: 'Mathematics and exact sciences',
          path: '/Courses/Sciences-exactes',
          parentId: null,
          level: 0,
          image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=400',
          children: [
            {
              _id: '2-1',
              name: 'Mathematics and Computer Science',
              description: 'Math and CS programs',
              path: '/Courses/Sciences-exactes/Math-and-Info',
              parentId: '2',
              level: 1,
              image: '',
              children: []
            }
          ]
        },
        {
          _id: '3',
          name: 'Medicine and Pharmacy',
          description: 'Medical and pharmaceutical studies',
          path: '/Courses/Medicine-and-Pharmacy',
          parentId: null,
          level: 0,
          image: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400',
          children: []
        }
      ];

      setCategories(initialCategories);
      
      // Fetch existing courses
      const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/trending-courses`);
      const data = await response.json();
      setCourses(data.courses || []);
      
      setLoading(false);
    } catch (error) {
      console.error('Error initializing data:', error);
      setLoading(false);
    }
  };

  const handleCreateCategory = async (categoryData) => {
    try {
      const newCategory = {
        _id: Date.now().toString(),
        ...categoryData,
        path: generateCategoryPath(categoryData.name, categoryData.parentId),
        level: categoryData.parentId ? findCategoryLevel(categoryData.parentId) + 1 : 0,
        children: []
      };

      if (categoryData.parentId) {
        const updatedCategories = addCategoryToParent(categories, categoryData.parentId, newCategory);
        setCategories(updatedCategories);
      } else {
        setCategories([...categories, newCategory]);
      }

      toast.success('Category created successfully!');
    } catch (error) {
      toast.error('Failed to create category');
    }
  };

  const handleUpdateCategory = async (categoryId, categoryData) => {
    try {
      const updatedCategories = updateCategoryInTree(categories, categoryId, categoryData);
      setCategories(updatedCategories);
      toast.success('Category updated successfully!');
    } catch (error) {
      toast.error('Failed to update category');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm('Are you sure you want to delete this category? This will also delete all subcategories and courses.')) {
      return;
    }

    try {
      const updatedCategories = deleteCategoryFromTree(categories, categoryId);
      setCategories(updatedCategories);
      toast.success('Category deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  const handleCreateCourse = async (courseData) => {
    try {
      const newCourse = {
        _id: Date.now().toString(),
        course_id: `course-${Date.now()}`,
        title: courseData.title,
        des: courseData.description,
        description: courseData.description,
        level: courseData.level,
        banner: courseData.banner,
        tags: courseData.tags,
        content: courseData.content,
        categoryId: courseData.categoryId,
        author: {
          personal_info: {
            username: userAuth.username,
            profile_img: userAuth.profile_img,
            fullname: userAuth.fullname
          }
        },
        activity: {
          total_views: 0,
          total_likes: 0
        },
        publishedAt: new Date().toISOString()
      };

      setCourses([...courses, newCourse]);
      toast.success('Course created successfully!');
    } catch (error) {
      toast.error('Failed to create course');
    }
  };

  const handleUpdateCourse = async (courseId, courseData) => {
    try {
      const updatedCourses = courses.map(course =>
        course._id === courseId ? { ...course, ...courseData } : course
      );
      setCourses(updatedCourses);
      toast.success('Course updated successfully!');
    } catch (error) {
      toast.error('Failed to update course');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      setCourses(courses.filter(course => course._id !== courseId));
      toast.success('Course deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  // Helper functions
  const generateCategoryPath = (name, parentId) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (parentId) {
      const parent = findCategoryById(categories, parentId);
      return parent ? `${parent.path}/${slug}` : `/Courses/${slug}`;
    }
    return `/Courses/${slug}`;
  };

  const findCategoryById = (categoryList, id) => {
    for (const category of categoryList) {
      if (category._id === id) return category;
      if (category.children) {
        const found = findCategoryById(category.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findCategoryLevel = (categoryId) => {
    const category = findCategoryById(categories, categoryId);
    return category ? category.level : 0;
  };

  const addCategoryToParent = (categoryList, parentId, newCategory) => {
    return categoryList.map(category => {
      if (category._id === parentId) {
        return { ...category, children: [...category.children, newCategory] };
      }
      if (category.children) {
        return { ...category, children: addCategoryToParent(category.children, parentId, newCategory) };
      }
      return category;
    });
  };

  const updateCategoryInTree = (categoryList, categoryId, updateData) => {
    return categoryList.map(category => {
      if (category._id === categoryId) {
        return { ...category, ...updateData };
      }
      if (category.children) {
        return { ...category, children: updateCategoryInTree(category.children, categoryId, updateData) };
      }
      return category;
    });
  };

  const deleteCategoryFromTree = (categoryList, categoryId) => {
    return categoryList.filter(category => {
      if (category._id === categoryId) return false;
      if (category.children) {
        category.children = deleteCategoryFromTree(category.children, categoryId);
      }
      return true;
    });
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
    <AdminRoute>
      <AnimationWrapper>
        <div className="mt-20 px-6">
          <Toaster />
          <Header title="Admin - Courses Management" />

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'categories'
                  ? 'text-white'
                  : 'border-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === 'categories' ? currentColor : 'transparent',
                borderColor: currentColor
              }}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'text-white'
                  : 'border-2 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              style={{
                backgroundColor: activeTab === 'courses' ? currentColor : 'transparent',
                borderColor: currentColor
              }}
            >
              Courses
            </button>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-secondary-dark rounded-xl p-6">
            {activeTab === 'categories' ? (
              <CategoryManager
                categories={categories}
                setCategories={setCategories}
                onCreateCategory={handleCreateCategory}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            ) : (
              <CourseManager
                courses={courses}
                setCourses={setCourses}
                categories={categories}
                onCreateCourse={handleCreateCourse}
                onUpdateCourse={handleUpdateCourse}
                onDeleteCourse={handleDeleteCourse}
              />
            )}
          </div>
        </div>
      </AnimationWrapper>
    </AdminRoute>
  );
};

export default AdminCourses;