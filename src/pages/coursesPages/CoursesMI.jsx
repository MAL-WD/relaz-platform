import React from 'react';
import {Link} from 'react-router-dom'
import matter from '../../data/matter.png'
import mathInfo from '../../data/mathinfo.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesMI = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Math-and-Computer Science" title="Courses Categories" />
      <div className="categories grid gap-5">

        <Category link="/Courses/Sciences-Exactes/Math-and-Info/Socle-Commun"  ImgTitle={"Socle Commun"} CatTitle="Socle Commun" CatCourses=""/>
        <Category link="/Courses/Sciences-exactes/Math-and-Info/Mathematics"  ImgTitle={"Mathematics"} CatTitle="Mathematics" CatCourses=""/>
        <Category link="/Courses/Sciences-exactes/Math-and-Info/Computer-Science"  ImgTitle={"Computer Science"} CatTitle="Computer Science" CatCourses=""/>
       
        
      </div>
    </div>
  );
};
export default CoursesMI;
