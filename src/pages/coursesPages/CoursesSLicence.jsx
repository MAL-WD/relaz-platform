import React from 'react';
import {Link} from 'react-router-dom'
import human from '../../data/human.avif'
import social from '../../data/social.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesSLicence = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Humanities-and-Social" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Humanities-and-Social/Social/Licence/Sociology"  ImgTitle={"Sociology"} CatTitle="Sociology" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Social/Licence/Psychology"  ImgTitle={"Psychology"} CatTitle="Psychology" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Social/Licence/Philosophy"  ImgTitle={"Philosophy"} CatTitle="Philosophy" CatCourses=""/>
       
        
      </div>
    </div>
  );
};
export default CoursesSLicence;
