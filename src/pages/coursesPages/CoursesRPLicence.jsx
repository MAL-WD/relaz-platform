import React from 'react';
import {Link} from 'react-router-dom'

import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category,CoursesDynamic } from '../../components';

const CoursesRPLicence = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Medicine-and-Pharmacy" title="Courses Categories" />
      <div className="categories grid gap-5">
        <Category link="/Courses/Rights-and-Political/Rights/Licence/Scole-commun" CatTitle={"Scole-commun"} ImgTitle={"Scole-commun"}/>
        <Category link="/Courses/Rights-and-Political/Rights/Licence/general-law" CatTitle={"General Law"} ImgTitle={"General Law"}/>
        <Category link="/Courses/Rights-and-Political/Rights/Licence/private-law" CatTitle={"private Law"} ImgTitle={"private Law"}/>
      {/* <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} />
      <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} />
      <CoursesDynamic routePath="All Courses / Rights-and-Political / Rights / Licence" linkCat="/Courses/Rights-and-Political/Rights/Licence/tronc-commun" CatTitle={"Tronc Commun"} /> */}
       
        
      </div>
    </div>
  );
};
export default CoursesRPLicence;
