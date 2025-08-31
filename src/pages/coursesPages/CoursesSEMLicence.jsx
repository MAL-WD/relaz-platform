import React from 'react';
import {Link} from 'react-router-dom'
import matter from '../../data/matter.png'
import mathInfo from '../../data/mathinfo.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesSEMLicence = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Math-and-Computer Science" title="Courses Categories" />
      <div className="categories grid gap-5">
        <Category link="/Courses/Sciences-exactes/Science-of-Matter/Licence/Socle-commun"  ImgTitle={"Socle commun"} CatTitle="Socle commun" CatCourses="35"/>
        <Category link="/Courses/Sciences-exactes/Science-of-Matter/Licence/Chemistry"  ImgTitle={"Chemistry"} CatTitle="Chemistry" CatCourses="35"/>
        <Category link="/Courses/Sciences-exactes/Science-of-Matter/Licence/Physique"  ImgTitle={"Physique"} CatTitle="Physique" CatCourses="35"/>
       
        
      </div>
    </div>
  );
};
export default CoursesSEMLicence;
