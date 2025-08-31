import React from 'react';
import {Link} from 'react-router-dom'
import licence from '../../data/Licence.jpg'
import master from '../../data/master.jpg'
import HistoryNavigation from '../../components/HistoryNavigation';


import { Header,Category } from '../../components';

const CoursesDegree = ({routePath,linkLicence,linkMaster,linkCommon,CouLicence,CouMaster}) => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route={routePath} title="Courses Categories" />
      <div className="categories grid gap-5">
        {linkCommon && <Category link={linkCommon}  ImgTitle={"Scole Commun"} CatTitle="Scole Commun" CatCourses={CouLicence ? CouLicence: "0"}/>}
        <Category link={linkLicence}  CatImg={licence} CatTitle="Licence" CatCourses={CouLicence ? CouLicence: "0"}/>
        <Category link={linkMaster}  CatImg={master} CatTitle="Master" CatCourses={CouMaster ? CouMaster: "0"}/>
       
        
      </div>
    </div>
  );
};
export default CoursesDegree;
