import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import EditSvg from '../components svgs/EditSvg';
import DeleteSvg from '../components svgs/DeleteSvg';
import CloseSvg from '../components svgs/CloseSvg';
import { UploadFile } from '../common/aws';

const CourseManager = ({ 
  courses, 
  setCourses, 
  categories,
  onCreateCourse, 
  onUpdateCourse, 
  onDeleteCourse 
}) => {
  const { currentColor } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    level: '',
    banner: '',
    tags: [],
    content: []
  });

  const [newTag, setNewTag] = useState('');

  const openModal = (course = null) => {
    if (course) {
      setForm({
        title: course.title,
        description: course.description || course.des,
        categoryId: course.categoryId || '',
        level: course.level,
        banner: course.banner,
        tags: course.tags || [],
        content: course.content || []
      });
      setEditingCourse(course);
    } else {
      setForm({
        title: '',
        description: '',
        categoryId: '',
        level: '',
        banner: '',
        tags: [],
        content: []
      });
      setEditingCourse(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setForm({
      title: '',
      description: '',
      categoryId: '',
      level: '',
      banner: '',
      tags: [],
      content: []
    });
    setNewTag('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const loadingToast = toast.loading('Uploading image...');
    try {
      const url = await UploadFile(file);
      if (url) {
        setForm({ ...form, banner: url });
        toast.dismiss(loadingToast);
        toast.success('Image uploaded successfully!');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to upload image');
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm({ ...form, tags: [...form.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setForm({ ...form, tags: form.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingCourse) {
      await onUpdateCourse(editingCourse._id, form);
    } else {
      await onCreateCourse(form);
    }
    
    closeModal();
  };

  const renderCategoryOptions = (categoryList, prefix = '') => {
    return categoryList.flatMap(category => [
      <option key={category._id} value={category._id}>
        {prefix}{category.name}
      </option>,
      ...(category.children ? renderCategoryOptions(category.children, prefix + '-- ') : [])
    ]);
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-dark rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {editingCourse ? 'Edit Course' : 'Create Course'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Course Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Level
              </label>
              <input
                type="text"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Licence 1, Master 2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter course description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Category
            </label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {renderCategoryOptions(categories)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Course Banner
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white"
            />
            {form.banner && (
              <img src={form.banner} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded-lg" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add a tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: currentColor }}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 p-3 rounded-lg text-white font-medium transition-colors"
              style={{ backgroundColor: currentColor }}
            >
              {editingCourse ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black dark:text-white">Courses Management</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: currentColor }}
        >
          Add Course
        </button>
      </div>

      {courses.length > 0 ? (
        <div className="grid gap-4">
          {courses.map(course => (
            <div key={course._id} className="flex items-center justify-between p-4 bg-white dark:bg-secondary-dark border border-gray-200 dark:border-gray-600 rounded-lg group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                {course.banner && (
                  <img src={course.banner} alt={course.title} className="w-16 h-12 rounded-lg object-cover" />
                )}
                <div>
                  <h3 className="font-semibold text-lg text-black dark:text-white">{course.title}</h3>
                  <p className="text-sm text-grey">{course.description || course.des}</p>
                  <div className="flex gap-4 text-xs text-grey mt-1">
                    <span>Level: {course.level}</span>
                    <span>Views: {course.activity?.total_views || 0}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  to={`/Courses/${course.course_id}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
                >
                  View
                </Link>
                <button
                  onClick={() => openModal(course)}
                  className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  title="Edit Course"
                >
                  <EditSvg fill="#3b82f6" />
                </button>
                <button
                  onClick={() => onDeleteCourse(course._id)}
                  className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
                  title="Delete Course"
                >
                  <DeleteSvg fill="#ef4444" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-grey">
          No courses created yet
        </div>
      )}

      {showModal && <Modal />}
    </div>
  );
};

export default CourseManager;