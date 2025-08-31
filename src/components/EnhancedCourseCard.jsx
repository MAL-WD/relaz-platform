import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider';
import star from '../data/star-rate.svg';
import certificate from '../data/certificate.svg';
import EditSvg from '../components svgs/EditSvg';
import DeleteSvg from '../components svgs/DeleteSvg';

const EnhancedCourseCard = ({ course, onEdit, onDelete, showAdminControls = false }) => {
  const { currentColor } = useStateContext();
  const [showControls, setShowControls] = useState(false);

  const {
    publishedAt,
    tags = [],
    title,
    des,
    banner,
    category,
    level,
    author: { personal_info: { fullname, username, profile_img } } = { personal_info: {} },
    course_id: id,
    activity = {}
  } = course;

  return (
    <div 
      className="course rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-500 relative group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Admin Controls */}
      {showAdminControls && showControls && (
        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(course)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            title="Edit Course"
          >
            <EditSvg fill="white" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(course._id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            title="Delete Course"
          >
            <DeleteSvg fill="white" className="w-4 h-4" />
          </button>
        </div>
      )}

      <Link to={`/Courses/${id}`}>
        <div className="image p-3 rounded-full">
          <img 
            className="rounded-2xl object-contain h-[150px] max-h-[200px] w-full min-w-48" 
            src={banner} 
            alt="course banner" 
          />
        </div>
        
        <div className="course-info p-3">
          {tags.length > 0 && (
            <div 
              className="domain border border-light-gray dark:border-dark-gray rounded-3xl font-semibold w-fit text-xs px-2 p-1" 
              style={{ color: currentColor }}
            >
              {tags[0]}
            </div>
          )}
          
          <p className="font-semibold mt-1 dark:text-gray-200 line-clamp-2 leading-7 text-black dark:text-white my-1 text-lg">
            {title}
          </p>
          
          <p className="mt-1 dark:text-gray-200 line-clamp-4 text-sm text-grey dark:text-white mb-4 text-lg">
            {des}
          </p>
          
          <div className="profile flex gap-2 align-center pb-4 border-b border-b-gray-200">
            <img className="w-6 h-6 rounded-full" src={profile_img} alt="" />
            <p className="text-grey dark:text-gray-400 text-sm">{username}</p>
          </div>
        </div>
        
        <div className="course-review justify-between flex align-center p-3 pt-0 text-xs gap-2">
          <div className="review flex gap-2 align-center">
            <img className="w-4 h-4" src={star} alt="" />
            <p className="review font-semibold">4.5</p>
          </div>
          <span className="text-gray-400">·</span>
          <div className="level flex gap-2 font-semibold align-center">
            <img className="w-4 h-4" src={certificate} alt="" />
            {level}
          </div>
        </div>
        
        <div className="button pt-1 pb-4 px-3">
          <button 
            className="text-white text-md font-semibold text-center p-3.5 my-1 rounded-3xl w-full mt-auto" 
            style={{ background: currentColor }}
          >
            Start Now
          </button>
        </div>
      </Link>
    </div>
  );
};

export default EnhancedCourseCard;