import React from 'react';
import {Link} from 'react-router-dom'
import arabic from '../../data/arabic.webp'
import frensh from '../../data/frensh.jpg'
import english from '../../data/english.avif'
import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category } from '../../components';

const CoursesLL = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Literatures-and-Languagues" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Literatures-and-languages/Arabic"  CatImg={arabic} CatTitle="Arabic" CatCourses="35"/>
        <Category link="/Courses/Literatures-and-languages/Frensh"  CatImg={frensh} CatTitle="Frensh" CatCourses="10"/>
        <Category link="/Courses/Literatures-and-languages/English"  CatImg={english} CatTitle="English" CatCourses="10"/>
       
        
      </div>
    </div>
  );
};
export default CoursesLL;
