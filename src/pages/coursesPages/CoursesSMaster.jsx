import React from 'react';
import {Link} from 'react-router-dom'
import human from '../../data/human.avif'
import social from '../../data/social.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesSMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Humanities-and-Social" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Humanities-and-Social/Social/Master/Sociology-of-organization-and-work"  ImgTitle={"Sociology of organization and work"} CatTitle="Sociology of organization and work" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Social/Master/Sociology-of-education"  ImgTitle={"Sociology of education"} CatTitle="Sociology of education" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Social/Master/Clinical-Psychology"  ImgTitle={"Clinical Psychology"} CatTitle="Clinical Psychology" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Social/Master/General-Philosophy"  ImgTitle={"General Philosophy"} CatTitle="General Philosophy" CatCourses=""/>
       
        
      </div>
    </div>
  );
};
export default CoursesSMaster;
