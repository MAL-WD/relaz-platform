import React from 'react';
import {Link} from 'react-router-dom'


import { Header,Category,CoursesDynamic } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesRPMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Medicine-and-Pharmacy" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Rights-and-Political/Rights/Master/general-law" CatTitle={"General Law"} ImgTitle={"General Law"}/>
        <Category link="/Courses/Rights-and-Political/Rights/Master/private-law" CatTitle={"Private Law"} ImgTitle={"Private Law"}/>
        <Category link="/Courses/Rights-and-Political/Rights/Master/business-law" CatTitle={"Business Law"} ImgTitle={"Business Law"}/>
        <Category link="/Courses/Rights-and-Political/Rights/Master/state-and-institutions" CatTitle={"State and Institutions"} ImgTitle={"State and Institutions"}/>
    
       
        
      </div>
    </div>
  );
};
export default CoursesRPMaster;
