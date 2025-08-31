import React from 'react';
import {Link} from 'react-router-dom'


import { Header,Category } from '../../components';
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesSemestre = ({ routePath, linkSemestre,  CouSemestre,numYears, numSemesters,startSemester = 1 }) => {
  const editing = { allowDeleting: true, allowEditing: true };
  // Create an array to hold the number of semesters
  const semesters = Array.from({ length: numSemesters }, (_, index) => index + startSemester);
  const years = Array.from({ length: numYears }, (_, index) => index +1);
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header route={routePath} title="Courses Categories" />
      <div className="categories grid gap-5 " >
        {/* Render each semester */}
        {numYears && years.map(year => (
          <Category
            key={year}
            link={`${linkSemestre}/${year}-year`}
            ImgTitle={`Year ${year}`}
            CatTitle={`Year ${year}`} // Append year number to the title
            CatCourses={CouSemestre ? CouSemestre : "0"}
          />
        ))}
        {numSemesters && semesters.map(semester => (
          <Category
            key={semester}
            link={`${linkSemestre}/Semestre-${semester}`}
            ImgTitle={`Semestre ${semester}`}
            CatTitle={`Semestre ${semester}`} // Append semester number to the title
            CatCourses={CouSemestre ? CouSemestre : "0"}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesSemestre;
