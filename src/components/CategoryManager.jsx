import React, { useState } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import toast from 'react-hot-toast';
import EditSvg from '../components svgs/EditSvg';
import DeleteSvg from '../components svgs/DeleteSvg';
import CloseSvg from '../components svgs/CloseSvg';

const CategoryManager = ({ 
  categories, 
  setCategories, 
  onCreateCategory, 
  onUpdateCategory, 
  onDeleteCategory 
}) => {
  const { currentColor } = useStateContext();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    parentId: null
  });

  const openModal = (category = null, parent = null) => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description,
        image: category.image || '',
        parentId: category.parentId
      });
      setEditingCategory(category);
    } else {
      setForm({
        name: '',
        description: '',
        image: '',
        parentId: parent?._id || null
      });
      setEditingCategory(null);
    }
    setSelectedParent(parent);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setSelectedParent(null);
    setForm({ name: '', description: '', image: '', parentId: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      await onUpdateCategory(editingCategory._id, form);
    } else {
      await onCreateCategory(form);
    }
    
    closeModal();
  };

  const renderCategoryTree = (categoryList, level = 0) => {
    return categoryList.map(category => (
      <div key={category._id} className={`ml-${level * 4} mb-2`}>
        <div className="flex items-center justify-between p-4 bg-white dark:bg-secondary-dark rounded-lg border border-gray-200 dark:border-gray-600 group hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            {category.image && (
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-12 h-12 rounded-lg object-cover" 
              />
            )}
            <div>
              <h3 className="font-semibold text-lg text-black dark:text-white">
                {category.name}
              </h3>
              <p className="text-sm text-grey">{category.description}</p>
              <p className="text-xs text-grey">Level: {category.level}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => openModal(null, category)}
              className="p-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
              title="Add Subcategory"
            >
              <span className="text-green-600 font-bold text-lg">+</span>
            </button>
            <button
              onClick={() => openModal(category)}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
              title="Edit Category"
            >
              <EditSvg fill="#3b82f6" />
            </button>
            <button
              onClick={() => onDeleteCategory(category._id)}
              className="p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
              title="Delete Category"
            >
              <DeleteSvg fill="#ef4444" />
            </button>
          </div>
        </div>
        
        {category.children && category.children.length > 0 && (
          <div className="ml-6 border-l-2 border-gray-200 dark:border-gray-600 pl-4 mt-2">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const Modal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-secondary-dark rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {editingCategory ? 'Edit Category' : 'Create Category'}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Category Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-main-dark text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter image URL"
            />
          </div>

          {selectedParent && (
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-grey">
                Parent Category: <span className="font-medium text-black dark:text-white">{selectedParent.name}</span>
              </p>
            </div>
          )}

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
              {editingCategory ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-black dark:text-white">Categories</h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 rounded-lg text-white font-medium transition-colors"
          style={{ backgroundColor: currentColor }}
        >
          Add Category
        </button>
      </div>

      {categories.length > 0 ? (
        <div className="space-y-2">
          {renderCategoryTree(categories)}
        </div>
      ) : (
        <div className="text-center py-8 text-grey">
          No categories created yet
        </div>
      )}

      {showModal && <Modal />}
    </div>
  );
};

export default CategoryManager;