import React from 'react';
import {Link} from 'react-router-dom'
import human from '../../data/human.avif'
import social from '../../data/social.jpg'
import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category } from '../../components';

const CoursesHS = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Medicine-and-Pharmacy" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Humanities-and-Social/Humanities"  CatImg={human} CatTitle="Humanities" CatCourses="35"/>
        <Category link="/Courses/Humanities-and-Social/Social"  CatImg={social} CatTitle="Social" CatCourses="10"/>
       
        
      </div>
    </div>
  );
};
export default CoursesHS;
