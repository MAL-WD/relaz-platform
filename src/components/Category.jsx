import React from "react";
import {Link} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';


const Category = ({link,CatImg,ImgTitle,CatTitle,CatCourses}) => { 
  const { currentColor } = useStateContext();

    return (
            <div className="category  dark:bg-secondary-dark  bg-white p-4 rounded-2xl">
              <Link to={link}>
                <div className="image rounded-xl h-40 w-full text-center grid items-center overflow-hidden" style={ImgTitle && {background:currentColor,paddingInline:"10px"}}>
                    <p className="text-2xl font-semibold text-black dark:text-white dark:text-gray-200 text-black dark:text-white">{ImgTitle}</p>
             {CatImg && <img className=' rounded-xl' style={{objectFit:"contain"}} src={CatImg} alt="" />}
                </div>
              <p className='mt-4 mb-2 text-lg line-clamp-2 leading-7 font-semibold text-black dark:text-white dark:text-gray-200 text-black dark:text-white '>{CatTitle}</p>
              <p className='text-grey  dark:text-gray-400 text-sm'>Courses : {CatCourses? CatCourses:0}</p>
              </Link>
            </div>
    )
  }
  export default Category;
