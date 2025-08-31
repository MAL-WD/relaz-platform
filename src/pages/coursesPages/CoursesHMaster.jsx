import React from 'react';
import {Link} from 'react-router-dom'
import human from '../../data/human.avif'
import social from '../../data/social.jpg'
import HistoryNavigation from '../../components/HistoryNavigation';

import { Header,Category } from '../../components';

const CoursesHMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Humanities-and-Social" title="Courses Categories" />
      <div className="categories grid gap-5 ">
        <Category link="/Courses/Humanities-and-Social/Humanities/Master/History-of-the-resistance-and-the-Algerian-national-movement"  ImgTitle={"History of the resistance and the Algerian national movement"} CatTitle="History of the resistance and the Algerian national movement" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Humanities/Master/History-of-the-Islamic-West-in-the-Middle-Ages"  ImgTitle={"History of the Islamic West in the Middle Ages"} CatTitle="History of the Islamic West in the Middle Ages" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Humanities/Master/Maintenance-and-restoration"  ImgTitle={"Maintenance and restoration"} CatTitle="Maintenance and restoration" CatCourses=""/>
        <Category link="/Courses/Humanities-and-Social/Humanities/Master/Communication-and-public-relations"  ImgTitle={"Communication and public relations"} CatTitle="Communication and public relations" />
       
        
      </div>
    </div>
  );
};
export default CoursesHMaster;
