import React from 'react';
import {Link} from 'react-router-dom'
import rights from '../../data/rights.avif'
import policy from '../../data/policy.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesRP = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Rights-and-Political" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Rights-and-Political/Rights"  CatImg={rights} CatTitle="Rights Science" CatCourses="35"/>
        <Category link="/Courses/Rights-and-Political/Policy"  CatImg={policy} CatTitle="Political Science" CatCourses="10"/>
       
        
      </div>
    </div>
  );
};
export default CoursesRP;
