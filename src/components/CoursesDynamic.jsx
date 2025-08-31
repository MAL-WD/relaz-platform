import React from 'react';



import { Header,Category } from '.';

const CoursesDynamic = ({routePath,linkCat,CatTitle,CatCourses}) => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route={routePath} title="Courses Categories" />
      <div className="categories grid gap-5 grid-cols-4">
        <Category link={linkCat}  ImgTitle={CatTitle} CatTitle={CatTitle} CatCourses={CatCourses ? CatCourses: "0"}/>
       
        
      </div>
    </div>
  );
};
export default CoursesDynamic;
