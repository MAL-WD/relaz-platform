import React from 'react';
import {Link} from 'react-router-dom'
import matter from '../../data/matter.png'
import mathInfo from '../../data/mathinfo.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesSE = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Math-and-Computer Science" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Sciences-exactes/Science-of-Matter"  CatImg={matter} CatTitle="Science of Matter" CatCourses="35"/>
        <Category link="/Courses/Sciences-exactes/Math-and-Info"  CatImg={mathInfo} CatTitle="Math and Computer Science" CatCourses="10"/>
       
        
      </div>
    </div>
  );
};
export default CoursesSE;
