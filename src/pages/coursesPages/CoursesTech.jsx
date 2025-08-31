import React from "react";
import { Link } from "react-router-dom";
import architacture from "../../data/architacture.avif";
import civil from "../../data/civil.avif";
import Mechanical from "../../data/Mechanical.jpg";
import Process from "../../data/Process.jpg";
import automatic from "../../data/Automatic.jpg";
import Public from "../../data/Public.jpg";
import Climate from "../../data/Climate.jpg";
import Electrical from "../../data/Electrical.jpg";
import Electronic from "../../data/Electronic.png";
import Telecommunication from "../../data/Telecommunication.png";
import st from "../../data/st.jpg";

import { Header,Category } from "../../components";
import HistoryNavigation from '../../components/HistoryNavigation';

const CoursesTech = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="mt-20 px-6 rounded-3xl">
      <HistoryNavigation/>
      <Header
        route="All Courses / Technology"
        title="Courses Categories"
      />
      <div className="categories grid gap-5 ">

        <Category
          link="/Courses/Technology/Scole-commun"
          ImgTitle={"Scole-commun"}
          CatTitle="Scole-commun"
          CatCourses="0"
        />
        <Category
          link="/Courses/Technology/Civil-engineering
          "
          CatImg={civil}
          CatTitle="Civil engineering
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Mechanical-engineering
          "
          CatImg={Mechanical}
          CatTitle="Mechanical engineering
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Process-engineering
          "
          CatImg={Process}
          CatTitle="Process engineering
          "
          CatCourses="35"
        />
          <Category
            link="/Courses/Technology/Architecture"
            CatImg={architacture}
            CatTitle="Architecture"
            CatCourses="35"
          />
          <Category
            link="/Courses/Technology/Engineer-ST"
            CatImg={st}
            CatTitle="Engineer - ST
            "
            CatCourses="10"
          />
        <Category
          link="/Courses/Technology/Automation
          "
          CatImg={automatic}
          CatTitle="Automation 
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Electrical-engineering
          "
          CatImg={Electrical}
          CatTitle="Electrical engineering 
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Public-works
          "
          CatImg={Public }
          CatTitle="Public works 
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Electronic
          "
          CatImg={Electronic}
          CatTitle="Electronic 
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Telecommunication
          "
          CatImg={Telecommunication}
          CatTitle="Telecommunication 
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Hydraulic
          "
          ImgTitle={"Hydraulic"}
          CatTitle="Hydraulic
          "
          CatCourses="35"
        />
        <Category
          link="/Courses/Technology/Climate-Engineering"
          CatImg={Climate}
          CatTitle="Climate Engineering"
          CatCourses="35"
        />
      </div>
    </div>
  );
};
export default CoursesTech;
