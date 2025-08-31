import React from 'react';
import {Link} from 'react-router-dom'
import HistoryNavigation from '../../components/HistoryNavigation';




import { Header,Category,CoursesDynamic } from '../../components';

const CoursesBMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Literatures-and-languages" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Biology/Master/Molecular-biology" CatTitle={"Molecular biology"} ImgTitle={"Molecular biology"}/>
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Biology/Master/Applied-Microbiology" CatTitle={"Applied-Microbiology"} ImgTitle={"Applied-Microbiology"}/>
        
      
       
        
      </div>
    </div>
  );
};
export default CoursesBMaster;
