import React from 'react';
import {Link} from 'react-router-dom'



import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category } from '../../components';

const CoursesLLAMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Literatures-and-languages" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Literatures-and-languages/Arabic/Master/Applied-linguistics" CatTitle={"Applied linguistics"} ImgTitle={"Applied linguistics"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Master/Contemporary-literary-criticism" CatTitle={"Contemporary literary criticism"} ImgTitle={"Contemporary literary criticism"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Master/Modern-and-contemporary-arabic-literature" CatTitle={"Modern and contemporary Arabic literature"} ImgTitle={"Modern and contemporary Arabic literature"}/>
        
    
       
        
      </div>
    </div>
  );
};
export default CoursesLLAMaster;
