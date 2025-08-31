import React from 'react';
import {Link} from 'react-router-dom'
import medcine from '../../data/medcine.jpg'
import pharmacy from '../../data/Pharmacy.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesMP = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Medicine-and-Pharmacy" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Medicine-and-Pharmacy/Medicine"  CatImg={medcine} CatTitle="Medicine" CatCourses="35"/>
        <Category link="/Courses/Medicine-and-Pharmacy/Pharmacy"  CatImg={pharmacy} CatTitle="Pharmacy" CatCourses="10"/>
       
        
      </div>
    </div>
  );
};
export default CoursesMP;
