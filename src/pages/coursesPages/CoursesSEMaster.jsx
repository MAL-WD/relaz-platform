import React from 'react';
import {Link} from 'react-router-dom'
import matter from '../../data/matter.png'
import mathInfo from '../../data/mathinfo.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesSEMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Math-and-Computer Science" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Sciences-exactes/Science-of-Matter/Master/Analytical-Chemistry"  ImgTitle={"Analytical Chemistry"} CatTitle="Analytical Chemistry" CatCourses="35"/>
        <Category link="/Courses/Sciences-exactes/Science-of-Matter/Master/Catalyse"  ImgTitle={"Catalyse"} CatTitle="Catalyse" CatCourses="35"/>
        <Category link="/Courses/Sciences-exactes/Science-of-Matter/Master/Energy-physics-and-renewable-energies"  ImgTitle={"Energy physics and renewable energies"} CatTitle="Energy physics and renewable energies" CatCourses="35"/>
        <Category link="/Courses/Sciences-exactes/Science-of-Matter/Master/Materials-physics"  ImgTitle={"Materials physics"} CatTitle="Materials physics" CatCourses="35"/>
       
        
      </div>
    </div>
  );
};
export default CoursesSEMaster;
