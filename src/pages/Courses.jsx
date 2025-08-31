import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import policy from '../data/rights.avif';
import medcine from '../data/medcine.jpg';
import language from '../data/languages.webp';
import psycho from '../data/psychology.avif';
import techno from '../data/technology.avif';
import economy from '../data/ECONOMY.jpg';
import exacte from '../data/Science Exacte.avif';
import biology from '../data/biology.jpg';
// import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header, Category,NewCourse } from '../components';
import HistoryNavigation from '../components/HistoryNavigation';
const Courses = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation />
      <Header route="All Courses " title="Courses Categories" />
      <div
        className="categories grid gap-5 "
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
        <Category
          link="/Courses/Rights-and-Political"
          CatImg={policy}
          CatTitle="Rights and Political Science"
          CatCourses="30"
        />
        <Category
          link="/Courses/Medicine-and-Pharmacy"
          CatImg={medcine}
          CatTitle="Medicine and pharmacy"
          CatCourses="10"
        />
        <Category
          link="/Courses/Literatures-and-languages"
          CatImg={language}
          CatTitle="Literatures and languages"
          CatCourses="12"
        />
        <Category
          link="/Courses/Humanities-and-Social"
          CatImg={psycho}
          CatTitle="Humanities and social sciences"
          CatCourses="18"
        />
        <Category
          link="/Courses/Economic-Commercial-Management"
          CatImg={economy}
          CatTitle="Economic, commercial, management sciences"
          CatCourses="18"
        />
        <Category
          link="/Courses/Sciences-exactes"
          CatImg={exacte}
          CatTitle="Sciences exactes "
          CatCourses="18"
        />
        <Category
          link="/Courses/Science-Nature-and-Life"
          CatImg={biology}
          CatTitle="Natural and Life Sciences "
          CatCourses="18"
        />
        <Category
          link="/Courses/Technology"
          CatImg={techno}
          CatTitle="Technology "
          CatCourses="18"
        />
        <NewCourse/>

      </div>
      <Outlet />
    </div>
  );
};
export default Courses;
