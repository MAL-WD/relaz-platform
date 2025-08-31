import React from 'react';
import {Link} from 'react-router-dom'
import HistoryNavigation from '../../components/HistoryNavigation';


import { Header,Category,CoursesDynamic } from '../../components';

const CoursesFLicence = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Literatures-and-languages" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Food/Licence/Agri-food-technology-and-quality-control" CatTitle={"Agri-food technology and quality control"} ImgTitle={"Agri-food technology and quality control"}/>
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Food/Licence/Food-Nutrition-Pathologies" CatTitle={"Food Nutrition and Pathologies"} ImgTitle={"Food, Nutrition and Pathologies"}/>
        
      
       
        
      </div>
    </div>
  );
};
export default CoursesFLicence;
