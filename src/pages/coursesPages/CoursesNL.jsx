import React from 'react';
import {Link} from 'react-router-dom'
import agriculture from '../../data/Agriculture.jpg'
import biology from '../../data/biology.png'
import Biotechnology from '../../data/biotechnology.avif'
import food from '../../data/food.avif'

import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesNL = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route="All Courses / Science-Nature-and-Life" title="Courses Categories" />
      <div className="categories grid gap-5 ">

        <Category link="/Courses/Science-Nature-and-Life/Scole-commun"  ImgTitle={"Scole Commun"} CatTitle="Scole Commun" CatCourses="35"/>
        <Category link="/Courses/Science-Nature-and-Life/Agricultural-Sciences-Engineer"  CatImg={agriculture} CatTitle="Agricultural Sciences Engineer " CatCourses="35"/>

        <Category link="/Courses/Science-Nature-and-Life/Science-of-Agronomic"  CatImg={agriculture} CatTitle="Science of Agronomic" CatCourses="35"/>
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Biology"  CatImg={biology} CatTitle="Biology Science" CatCourses="10"/>
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Biotechnology"  CatImg={Biotechnology} CatTitle="Biotechnology Science" CatCourses="10"/>
        <Category link="/Courses/Science-Nature-and-Life/Science-of-Food"  CatImg={food} CatTitle="Science of Food" CatCourses="10"/>
       
        
      </div>
    </div>
  );
};
export default CoursesNL;
