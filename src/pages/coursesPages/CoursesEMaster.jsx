import React from 'react';
import {Link} from 'react-router-dom'
import eco from '../../data/eco.jpg'
import management from '../../data/managment.jpg'
import commerce from '../../data/commerce.avif'
import accounting from '../../data/accounting.avif'
import HistoryNavigation from '../../components/HistoryNavigation';


import { Header,Category } from '../../components';

const CoursesEMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Economic-Commercial-Management" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Economic-Commercial-Management/Economic/Master/Economics-and-management-of-institutions"  ImgTitle={"Economics and management of institutions"} CatTitle="Economics and management of institutions" CatCourses="35"/>
        <Category link="/Courses/Economic-Commercial-Management/Economic/Master/Monetary-and-banking-economics"  ImgTitle={"Monetary and banking economics"} CatTitle="Monetary and banking economics" CatCourses="35"/>
       
        
      </div>
    </div>
  );
};
export default CoursesEMaster;
