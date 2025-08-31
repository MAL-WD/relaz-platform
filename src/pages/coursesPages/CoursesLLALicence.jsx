import React from 'react';
import {Link} from 'react-router-dom'

import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category,CoursesDynamic } from '../../components';

const CoursesLLALicence = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Literatures-and-languages" title="Courses Categories" />
      <div className="categories grid gap-5">
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/core-curriculum" CatTitle={"Core Curriculum"} ImgTitle={"Core Curriculum"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/Criticism-and-curriculum" CatTitle={"Criticism and curriculum"} ImgTitle={"Criticism and curriculum"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/Criticism-and-Litrary-studies" CatTitle={"Criticism and Litrary studies"} ImgTitle={"Criticism and Litrary studies"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/Algerian-Litrature" CatTitle={"Algerian Litrature"} ImgTitle={"Algerian Litrature"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/Comparative-and-world-Litrature" CatTitle={"Comparative and world Litrature"} ImgTitle={"Comparative and world Litrature"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/Arabic-Litrature" CatTitle={"Arabic Litrature"} ImgTitle={"Arabic Litrature"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/General-linguistics" CatTitle={"General linguistics"} ImgTitle={"General linguistics"}/>
        <Category link="/Courses/Literatures-and-languages/Arabic/Licence/Applied-linguistics" CatTitle={"Applied linguistics"} ImgTitle={"Applied linguistics"}/>
      {/* <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} />
      <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} />
      <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} /> */}
       
        
      </div>
    </div>
  );
};
export default CoursesLLALicence;
