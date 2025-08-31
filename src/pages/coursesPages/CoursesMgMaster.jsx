import React from 'react';
import {Link} from 'react-router-dom'
import eco from '../../data/eco.jpg'
import management from '../../data/managment.jpg'
import commerce from '../../data/commerce.avif'
import accounting from '../../data/accounting.avif'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesMgMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Economic-Commercial-Management" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Economic-Commercial-Management/Management/Master/Human-Resource-Management"  ImgTitle={"Human Resource Management"} CatTitle="Human Resource Management" CatCourses="35"/>
        <Category link="/Courses/Economic-Commercial-Management/Management/Master/Strategic-management-of-enterprises"  ImgTitle={"Strategic management of enterprises"} CatTitle="Strategic management of enterprises" CatCourses="35"/>
        <Category link="/Courses/Economic-Commercial-Management/Management/Master/Business-Management"  ImgTitle={"Business Management"} CatTitle="Business Management" CatCourses="35"/>
    -        
      </div>
    </div>
  );
};
export default CoursesMgMaster;
