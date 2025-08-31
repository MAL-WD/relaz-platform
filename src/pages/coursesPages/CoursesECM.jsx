import React from 'react';
import {Link} from 'react-router-dom'
import eco from '../../data/eco.jpg'
import management from '../../data/managment.jpg'
import commerce from '../../data/commerce.avif'
import accounting from '../../data/accounting.avif'
import HistoryNavigation from '../../components/HistoryNavigation';


import { Header,Category } from '../../components';

const CoursesECM = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Economic-Commercial-Management" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Economic-Commercial-Management/Scole-commun"  ImgTitle={"Scole commun"} CatTitle="Scole commun" CatCourses="35"/>
        <Category link="/Courses/Economic-Commercial-Management/Economic"  CatImg={eco} CatTitle="Economy" CatCourses="35"/>
        <Category link="/Courses/Economic-Commercial-Management/Management"  CatImg={management} CatTitle="Managment" CatCourses="10"/>
        <Category link="/Courses/Economic-Commercial-Management/Commercial"  CatImg={commerce} CatTitle="Commercial" CatCourses="10"/>
        <Category link="/Courses/Economic-Commercial-Management/Financial-and-accounting"  CatImg={accounting} CatTitle="Financial and accounting" CatCourses="10"/>
       
        
      </div>
    </div>
  );
};
export default CoursesECM;
