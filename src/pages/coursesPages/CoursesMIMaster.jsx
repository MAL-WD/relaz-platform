import React from 'react';
import {Link} from 'react-router-dom'
import matter from '../../data/matter.png'
import mathInfo from '../../data/mathinfo.jpg'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesMIMaster = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Math-and-Computer Science" title="Courses Categories" />
      <div className="categories grid gap-5 ">

        <Category link="/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Artificial-Intelligence-and-Decision-making"  ImgTitle={"Artificial Intelligence and Decision-making"} CatTitle="Artificial Intelligence and Decision-making" CatCourses=""/>
        <Category link="/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Advanced-Information-Systems"  ImgTitle={"Advanced Information Systems"} CatTitle="Advanced Information Systems" CatCourses=""/>
        <Category link="/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Computer-Systems-and-Networks"  ImgTitle={"Computer Systems and Networks"} CatTitle="Computer Systems and Networks" CatCourses=""/>
        <Category link="/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Data-Science-and-Cyber-Security"  ImgTitle={"Data Science and Cyber Security"} CatTitle="Data Science and Cyber Security" CatCourses=""/>
       
        
      </div>
    </div>
  );
};
export default CoursesMIMaster;
