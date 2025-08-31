import React from "react";
import add from '../data/add-circle.svg';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from "react-router-dom";
const NewCourse = () => {
  const { currentColor } = useStateContext();

    return ( 
        <div className='New-Course dark:bg-secondary-dark  bg-white p-4 rounded-2xl'>
            <div className="add justify-center rounded-xl h-40 w-full text-center grid items-center overflow-hidden border" >
            <button><img src={add} alt="" className='w-24'/></button>
        </div>
            <Link to="/Courses/CreateCourse" >

            <button className='mt-6  text-lg text-center mx-auto rounded-xl w-full p-2 font-semibold  text-gray-200 bg-gray-900' >New Course</button>
            </Link>

    </div> );
}
 
export default NewCourse;