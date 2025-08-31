import React from 'react';
import {Link} from 'react-router-dom'

import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category } from '../../components';

const CoursesBLicence = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Literatures-and-languages" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Biology/Licence/Molecular-biology" CatTitle={"Molecular biology"} ImgTitle={"Molecular biology"}/>
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Biology/Licence/Microbiology" CatTitle={"Microbiology"} ImgTitle={"Microbiology"}/>
        
      
       
        
      </div>
    </div>
  );
};
export default CoursesBLicence;
