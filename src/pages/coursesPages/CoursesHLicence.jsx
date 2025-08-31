import React from 'react';
import {Link} from 'react-router-dom'
import human from '../../data/human.avif'
import social from '../../data/social.jpg'
import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category } from '../../components';

const CoursesHLicence = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Humanities-and-Social" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Humanities-and-Social/Humanities/Licence/History"  ImgTitle={"History"} CatTitle="History" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Humanities/Licence/Archeology"  ImgTitle={"Archeology"} CatTitle="Archeology" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Humanities/Licence/Media-and-Communication-Sciences"  ImgTitle={"Media and Communication Sciences"} CatTitle="Media and Communication Sciences" CatCourses=""/>
       
        
      </div>
    </div>
  );
};
export default CoursesHLicence;
