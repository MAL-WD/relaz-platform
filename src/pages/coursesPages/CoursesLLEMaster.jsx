import React from 'react';
import {Link} from 'react-router-dom'

import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category } from '../../components';

const CoursesLLEMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Literatures-and-languages" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Literatures-and-languages/English/Master/Didactic" CatTitle={"Didactic"} ImgTitle={"Didactic"}/>
        <Category link="/Courses/Literatures-and-languages/English/Master/Literature-and-Civilization" CatTitle={"Literature and Civilization"} ImgTitle={"Literature and Civilization"}/>
        <Category link="/Courses/Literatures-and-languages/English/Master/Language-and-Culture" CatTitle={"Language and Culture"} ImgTitle={"Language and Culture"}/>
        
      {/* <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} />
      <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} />
      <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} /> */}
       
        
      </div>
    </div>
  );
};
export default CoursesLLEMaster;
