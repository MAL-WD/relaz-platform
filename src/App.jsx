import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import settings from './data/settings.svg'
import { Navbar, Footer, Sidebar, ThemeSettings, CoursesDynamic } from './components';
import { Dashboard, Courses, Calendar, Employees, Customers, Kanban, Editor } from './pages';
import  CoursesRP  from './pages/coursesPages/CoursesRP';
import  CoursesRPLicence  from './pages/coursesPages/CoursesRPLicence';
import  CoursesRPMaster  from './pages/coursesPages/CoursesRPMaster';
import  CaoursesDynamic  from './components/CoursesDynamic';
import  CoursesDegree  from './pages/coursesPages/CoursesDegree';
import  CoursesMP  from './pages/coursesPages/CoursesMP';
import  CoursesLL  from './pages/coursesPages/CoursesLL';
import  CoursesLLALicence  from './pages/coursesPages/CoursesLLALicence';
import  CoursesLLEMaster  from './pages/coursesPages/CoursesLLEMaster';
import  CoursesLLAMaster  from './pages/coursesPages/CoursesLLAMaster';
import  CoursesHS  from './pages/coursesPages/CoursesHS';
import  CoursesHLicence  from './pages/coursesPages/CoursesHLicence';
import  CoursesSLicence  from './pages/coursesPages/CoursesSLicence';
import  CoursesSMaster  from './pages/coursesPages/CoursesSMaster';
import  CoursesHMaster  from './pages/coursesPages/CoursesHMaster';
import  CoursesECM  from './pages/coursesPages/CoursesECM';
import  CoursesSE  from './pages/coursesPages/CoursesSE';
import  CoursesMI from './pages/coursesPages/CoursesMI';
import  CoursesNL  from './pages/coursesPages/CoursesNL';
import  CoursesTech  from './pages/coursesPages/CoursesTech';
import CoursesSemestre from './pages/coursesPages/CoursesSemestre';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';
import CoursesMIMaster from './pages/coursesPages/CoursesMIMaster';
import CoursesMMaster from './pages/coursesPages/CoursesMMaster';
import CoursesSEMLicence from './pages/coursesPages/CoursesSEMLicence';
import CoursesSEMaster from './pages/coursesPages/CoursesSEMaster';
import CoursesEMaster from './pages/coursesPages/CoursesEMaster';
import CoursesCMaster from './pages/coursesPages/CoursesCMaster';
import CoursesMgMaster from './pages/coursesPages/CoursesMgMaster';
import CoursesFAMaster from './pages/coursesPages/CoursesFAMaster';
import CoursesBLicence from './pages/coursesPages/CoursesBLicence';
import CoursesBMaster from './pages/coursesPages/CoursesBMaster';
import CoursesFLicence from './pages/coursesPages/CoursesFLicence';
import CoursesFMaster from './pages/coursesPages/CoursesFMaster';
import CreateCourse from './components/CreateCourse';
import UserAuthForm from './components/UserAuthForm';
import Blogs from './pages/Blogs';
import SearchPage from './pages/SearchPage';
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import Settings from './pages/ChangePassword';
import ChangePassword from './pages/ChangePassword';
import EditProfile from './pages/EditProfile';
import Notifications from './pages/Notifications';
import ManageBlogs from './pages/ManageBlogs';
import CourseEditor from './pages/CourseEditor';
import SemestrePage from './components/SemestrePage';
import LandingPage from './pages/LandingPage';
import CoursePage from './pages/CoursePage';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            {/* <TooltipComponent
              content="Settings"
              position="Top"
            > */}
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                
                {<img src={settings} className='w-7 h-7'></img>}
              </button>
              

            {/* </TooltipComponent> */}
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-main-dark bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-main-dark">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark  bg-light-gray min-h-screen md:ml-72 w-full  '
                : ' dark:bg-main-dark bg-light-gray w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-white dark:bg-main-dark navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                <Route path="/" element={(<Dashboard />)} />
                {/* dashboard  */}
                <Route path="dashboard" element={(<Dashboard />)} />
                {/* auth */}
                <Route path="/Sign-in" element={<UserAuthForm type="sign-in"/>}></Route>
                <Route path="/Sign-up" element={<UserAuthForm type="sign-up"/>}></Route>
                <Route path="/user/:id" element={<ProfilePage/>}></Route>
                

                {/* pages  */}
                <Route path="/Blogs" element={<Blogs />} />
                <Route path="/blog/:blog_id" element={<BlogPage />} />
                <Route path="/Manage Blogs" element={<ManageBlogs />} />
                <Route path="/search/:query" element={<SearchPage/>} />
                <Route path="/*" element={<PageNotFound/>} />

                <Route path="/Courses" element={<Courses />} />
                <Route path="/Courses/:course_id" element={<CoursePage />} />
                  <Route path='/Courses/Rights-and-Political' element={<CoursesRP />}/>
                
                    <Route path='/Courses/Rights-and-Political/Rights' element={<CoursesDegree routePath="All Courses / Rights-and-Political / Rights" linkLicence="/Courses/Rights-and-Political/Rights/Licence" linkMaster={"/Courses/Rights-and-Political/Rights/Master"}/>}/>
                      <Route path='/Courses/Rights-and-Political/Rights/Licence' element={<CoursesRPLicence />}/>
                        <Route path='/Courses/Rights-and-Political/Rights/Licence/Scole-commun' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Rights / Licence / Scole-commun"  linkSemestre="/Courses/Rights-and-Political/Rights/Licence/Scole-commun" numSemesters={4} />}/>
                        <Route path='/Courses/Rights-and-Political/Rights/Licence/Scole-commun/Semestre-1' element={<SemestrePage routePath="/Courses/Rights-and-Political/Rights/Licence/Scole-commun/Semestre-1" courses="courses"/> }/>
                        
                        <Route path='/Courses/Rights-and-Political/Rights/Licence/general-law' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Rights / Licence / General Law"  linkSemestre="/Courses/Rights-and-Political/Rights/Licence/general-law" startSemester={5} numSemesters={2} />}/>
                        <Route path='/Courses/Rights-and-Political/Rights/Licence/private-law' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Rights / Licence / Private Law"  linkSemestre="/Courses/Rights-and-Political/Rights/Licence/private-law" startSemester={5} numSemesters={2} />}/>
                      <Route path='/Courses/Rights-and-Political/Rights/Master' element={<CoursesRPMaster />}/>
                        <Route path='/Courses/Rights-and-Political/Rights/Master/general-law' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Rights / Master / General Law"  linkSemestre="/Courses/Rights-and-Political/Rights/Master/general-law"  numSemesters={4} />}/>
                        <Route path='/Courses/Rights-and-Political/Rights/Master/private-law' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Rights / Master / Private Law"  linkSemestre="/Courses/Rights-and-Political/Rights/Master/private-law"  numSemesters={4} />}/>
                        <Route path='/Courses/Rights-and-Political/Rights/Master/business-law' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Rights / Master / Business Law"  linkSemestre="/Courses/Rights-and-Political/Rights/Master/business-law"  numSemesters={4} />}/>
                        <Route path='/Courses/Rights-and-Political/Rights/Master/state-and-institutions' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Rights / Master / State and Institutions"  linkSemestre="/Courses/Rights-and-Political/Rights/Master/state-and-institutions" numSemesters={4} />}/>
                    <Route path='/Courses/Rights-and-Political/Policy' element={<CoursesDegree routePath="All Courses / Rights-and-Political / Policy" linkLicence="/Courses/Rights-and-Political/Policy/Licence" linkMaster={"/Courses/Rights-and-Political/Policy/Master"}/>}/>
                    <Route path='/Courses/Rights-and-Political/Policy/Licence' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Policy / Licence "  linkSemestre="/Courses/Rights-and-Political/Policy/Licence"  numSemesters={6}/>}/>
                    <Route path='/Courses/Rights-and-Political/Policy/Master' element={<CoursesSemestre routePath="All Courses / Rights-and-Political / Policy / Master "  linkSemestre="/Courses/Rights-and-Political/Policy/Master"  numSemesters={4}/>}/>
                  
                  <Route path='/Courses/Medicine-and-Pharmacy' element={<CoursesMP />}/>
                    <Route path='/Courses/Medicine-and-Pharmacy/Medicine' element={<CoursesSemestre routePath="All Courses / Medicine-and-Pharmacy / Medicine" linkYear="/Courses/Medicine-and-Pharmacy/Medicine" numYears={6}/>}/>
                    <Route path='/Courses/Medicine-and-Pharmacy/Pharmacy' element={<CoursesSemestre routePath="All Courses / Medicine-and-Pharmacy / Pharmacy" linkYear="/Courses/Medicine-and-Pharmacy/Pharmacy" numYears={6}/>}/>

                    <Route path='/Courses/Medicine-and-Pharmacy/Pharmacy' element={<CoursesDegree routePath="All Courses / Medicine-and-Pharmacy / Pharmacy"linkLicence="/Courses/Medicine-and-Pharmacy/Pharmacy/Licence" linkMaster={"/Courses/Rights-and-Political/Policy/Master"}/>}/>
                  <Route path='/Courses/Literatures-and-languages' element={<CoursesLL />}/>
                    <Route path='/Courses/Literatures-and-languages/Arabic' element={<CoursesDegree routePath={"All Courses / Literatures-and-languages / Arabic"} linkLicence={"/Courses/Literatures-and-languages/Arabic/Licence"} linkMaster={"/Courses/Literatures-and-languages/Arabic/Master"} />}/>
                      <Route path='/Courses/Literatures-and-languages/Arabic/Licence' element={<CoursesLLALicence />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/core-curriculum' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / Core Curriculum"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/core-curriculum" numSemesters={4} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/Criticism-and-curriculum' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / Criticism-and-curriculum"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/Criticism-and-curriculum" numSemesters={2} startSemester={5} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/Algerian-Litrature' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / Algerian-Litrature"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/Algerian-Litrature" numSemesters={2} startSemester={5} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/Arabic-Litrature' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / Arabic-Litrature"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/Arabic-Litrature" numSemesters={2} startSemester={5} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/General-linguistics' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / General-linguistics"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/Arabic-Litrature" numSemesters={2} startSemester={5} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/Applied-linguistics' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / Applied-linguistics"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/Arabic-Litrature" numSemesters={2} startSemester={5} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/Comparative-and-world-Litrature' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / Comparative-and-world-Litrature"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/Comparative-and-world-Litrature" numSemesters={2} startSemester={5} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Licence/Criticism-and-Litrary-studies' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Licence / Criticism and Litrary studies"  linkSemestre="/Courses/Literatures-and-languages/Arabic/Licence/Criticism and Litrary studies" numSemesters={2} startSemester={5} />}/>
                      <Route path='/Courses/Literatures-and-languages/Arabic/Master' element={<CoursesLLAMaster />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Master/Applied-linguistics' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Master / Applied-linguistics"  linkSemestre="/Courses/Rights-and-Political/Rights/Licence/Applied-linguistics" numSemesters={4} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Master/Contemporary-literary-criticism' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Master / Contemporary-literary-criticism"  linkSemestre="/Courses/Rights-and-Political/Rights/Licence/Contemporary-literary-criticism" numSemesters={4} />}/>
                        <Route path='/Courses/Literatures-and-languages/Arabic/Master/Modern-and-contemporary-arabic-literature' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Arabic / Master / Contemporary-literary-criticism"  linkSemestre="/Courses/Rights-and-Political/Rights/Licence/Modern-and-contemporary-arabic-literature" numSemesters={4} />}/>
                    <Route path='/Courses/Literatures-and-languages/Frensh' element={<CoursesDegree routePath={"All Courses / Literatures-and-languages / Frensh"} linkLicence={"/Courses/Literatures-and-languages/Frensh/Licence"} linkMaster={"/Courses/Literatures-and-languages/Frensh/Master"} />}/>
                      <Route path='/Courses/Literatures-and-languages/Frensh/Licence' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Frensh / Licence "  linkSemestre="/Courses/Literatures-and-languages/Frensh/Licence"  numSemesters={6}/>}/>
                      <Route path='/Courses/Literatures-and-languages/Frensh/Master' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / Frensh / Master "  linkSemestre="/Courses/Literatures-and-languages/Frensh/Master"  numSemesters={4}/>}/>
                    <Route path='/Courses/Literatures-and-languages/English' element={<CoursesDegree routePath={"All Courses / Literatures-and-languages / English"} linkLicence={"/Courses/Literatures-and-languages/English/Licence"} linkMaster={"/Courses/Literatures-and-languages/English/Master"} />}/>
                      <Route path='/Courses/Literatures-and-languages/English/Licence' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / English / Licence "  linkSemestre="/Courses/Literatures-and-languages/English/Licence"  numSemesters={6}/>}/>
                      <Route path='/Courses/Literatures-and-languages/English/Master' element={<CoursesLLEMaster/>}/>
                      <Route path='/Courses/Literatures-and-languages/English/Master/Didactic' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / English / Master / Didactic "  linkSemestre="/Courses/Literatures-and-languages/English/Master/Didactic"  numSemesters={4}/>}/>
                      <Route path='/Courses/Literatures-and-languages/English/Master/Literature-and-Civilization' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / English / Master / Literature and Civilization "  linkSemestre="/Courses/Literatures-and-languages/English/Master/Literature and Civilization"  numSemesters={4}/>}/>
                      <Route path='/Courses/Literatures-and-languages/English/Master/Language-and-Culture' element={<CoursesSemestre routePath="All Courses / Literatures-and-languages / English / Master / Language-and-Culture "  linkSemestre="/Courses/Literatures-and-languages/English/Master/Language-and-Culture"  numSemesters={4}/>}/>
                  <Route path='/Courses/Humanities-and-Social' element={<CoursesHS />}/>
                    <Route path='/Courses/Humanities-and-Social/Humanities' element={<CoursesDegree routePath={"All Courses / Humanities-and-Social / Humanities"} linkCommon={"/Courses/Humanities-and-Social/Humanities/core-curriculum"}  linkLicence={"/Courses/Humanities-and-Social/Humanities/Licence"} linkMaster={"/Courses/Humanities-and-Social/Humanities/Master"} />}/>
                      <Route path='/Courses/Humanities-and-Social/Humanities/core-curriculum' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / Core-curriculum"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/core-curriculum"} numSemesters={2}/>}/>
                      <Route path='/Courses/Humanities-and-Social/Humanities/Licence' element={<CoursesHLicence/>}/>
                        <Route path='/Courses/Humanities-and-Social/Humanities/Licence/History' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / Licence / History"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/Licence/History"} numSemesters={4} startSemester={3}/>}/>
                        <Route path='/Courses/Humanities-and-Social/Humanities/Licence/Archeology' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / Licence / Archeology"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/Licence/Archeology"} numSemesters={4} startSemester={3}/>}/>
                        <Route path='/Courses/Humanities-and-Social/Humanities/Licence/Media-and-Communication-Sciences' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / Licence / Media-and-Communication-Sciences"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/Licence/Media-and-Communication-Sciences"} numSemesters={4} startSemester={3}/>}/>
                      <Route path='/Courses/Humanities-and-Social/Humanities/Master' element={<CoursesHMaster/>}/>
                        <Route path='/Courses/Humanities-and-Social/Humanities/Master/History-of-the-resistance-and-the-Algerian-national-movement' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / Master / History-of-the-resistance-and-the-Algerian-national-movement"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/Master/History-of-the-resistance-and-the-Algerian-national-movement"} numSemesters={4} />}/>
                        <Route path='/Courses/Humanities-and-Social/Humanities/Master/History-of-the-Islamic-West-in-the-Middle-Ages' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / History-of-the-Islamic-West-in-the-Middle-Ages"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/History-of-the-Islamic-West-in-the-Middle-Ages"} numSemesters={4} />}/>
                        <Route path='/Courses/Humanities-and-Social/Humanities/Master/Maintenance-and-restoration' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / Maintenance-and-restoration"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/Maintenance-and-restoration"} numSemesters={4} />}/>
                        <Route path='/Courses/Humanities-and-Social/Humanities/Master/Communication-and-public-relations' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Humanities / Communication-and-public-relations"} linkSemestre={"/Courses/Humanities-and-Social/Humanities/Communication-and-public-relations"} numSemesters={4} />}/>
                    <Route path='/Courses/Humanities-and-Social/Social' element={<CoursesDegree routePath={"All Courses / Humanities-and-Social / Social"} linkCommon={"/Courses/Humanities-and-Social/Social/core-curriculum"} linkLicence={"/Courses/Humanities-and-Social/Social/Licence"} linkMaster={"/Courses/Humanities-and-Social/Social/Master"} />}/>
                      <Route path='/Courses/Humanities-and-Social/Social/core-curriculum' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Social / Core-curriculum"} linkSemestre={"/Courses/Humanities-and-Social/Social/core-curriculum"} numSemesters={2}/>}/>
                      <Route path='/Courses/Humanities-and-Social/Social/Licence' element={<CoursesSLicence/>}/>
                        <Route path='/Courses/Humanities-and-Social/Social/Licence/Sociology' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Social / Licence / Sociology"} linkSemestre={"/Courses/Humanities-and-Social/Social/Licence/Sociology"} numSemesters={4} startSemester={3}/>}/>
                        <Route path='/Courses/Humanities-and-Social/Social/Licence/Psychology' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Social / Licence / Psychology"} linkSemestre={"/Courses/Humanities-and-Social/Social/Licence/Psychology"} numSemesters={4} startSemester={3}/>}/>
                        <Route path='/Courses/Humanities-and-Social/Social/Licence/Philosophy' element={<CoursesSemestre routePath={"All Courses / Humanities-and-Social / Social / Licence / Psychology"} linkSemestre={"/Courses/Humanities-and-Social/Social/Licence/Philosophy"} numSemesters={4} startSemester={3}/>}/>
                      <Route path='/Courses/Humanities-and-Social/Social/Master' element={<CoursesSMaster/>}/>
                        <Route path='/Courses/Humanities-and-Social/Social/Master/Sociology-of-organization-and-work' element={<CoursesSemestre routePath={'/Courses/Humanities-and-Social/Master/Sociology-of-organization-and-work'} linkSemestre={'/Courses/Humanities-and-Social/Master/Sociology-of-organization-and-work'} numSemesters={4}/>}/>
                        <Route path='/Courses/Humanities-and-Social/Social/Master/Sociology-of-education' element={<CoursesSemestre routePath={'/Courses/Humanities-and-Social/Master/Sociology-of-education'} linkSemestre={'/Courses/Humanities-and-Social/Master/Sociology-of-education'} numSemesters={4}/>}/>
                        <Route path='/Courses/Humanities-and-Social/Social/Master/Clinical-Psychology' element={<CoursesSemestre routePath={'/Courses/Humanities-and-Social/Master/Clinical-Psychology'} linkSemestre={'/Courses/Humanities-and-Social/Master/Clinical-Psychology'} numSemesters={4}/>}/>
                        <Route path='/Courses/Humanities-and-Social/Social/Master/General-Philosophy' element={<CoursesSemestre routePath={'/Courses/Humanities-and-Social/Master/General-Philosophy'} linkSemestre={'/Courses/Humanities-and-Social/Master/Clinical-Psychology'} numSemesters={4}/>}/>
                  <Route path='/Courses/Economic-Commercial-Management' element={<CoursesECM />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Scole-commun' element={<CoursesSemestre routePath={'/Courses/Economic-Commercial-Management/Scole-commun'} linkSemestre={'/Courses/Economic-Commercial-Management/Scole-commun'} numSemesters={2}/>}/>
                    <Route path='/Courses/Economic-Commercial-Management/Economic' element={<CoursesDegree routePath={"All Courses / Economic-Commercial-Management / Economic"} linkLicence={"/Courses/Economic-Commercial-Management/Economic/Licence"} linkMaster={"/Courses/Economic-Commercial-Management/Economic/Master"} />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Economic/Licence' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Economic / Licence "} linkSemestre={"/Courses/Economic-Commercial-Management/Economic/Licence"} numSemesters={4} startSemester={3} />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Economic/Master' element={<CoursesEMaster />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Economic/Master/Economics-and-management-of-institutions' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Economic / Master /Economics-and-management-of-institutions "} linkSemestre={"/Courses/Economic-Commercial-Management/Economic/Master/Economics-and-management-of-institutions"} numSemesters={4} />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Commercial/Master/Marketing-Services' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Commercial / Master /Marketing-Services "} linkSemestre={"/Courses/Economic-Commercial-Management/Commercial/Master/Marketing-Services"} numSemesters={4} />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Commercial/Master/Finance-and-international-trade' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Commercial / Master /Finance-and-international-trade "} linkSemestre={"/Courses/Economic-Commercial-Management/Commercial/Master/Finance-and-international-trade"} numSemesters={4} />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Commercial' element={<CoursesDegree routePath={"All Courses / Economic-Commercial-Management / Commercial"} linkLicence={"/Courses/Economic-Commercial-Management/Commercial/Licence"} linkMaster={"/Courses/Economic-Commercial-Management/Commercial/Master"} />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Commercial/Licence' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Commercial / Licence "} linkSemestre={"/Courses/Economic-Commercial-Management/Commercial/Licence"} numSemesters={4} startSemester={3}  />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Commercial/Master' element={<CoursesCMaster/>}/>
                      <Route path='/Courses/Economic-Commercial-Management/Economic/Master/Monetary-and-banking-economics' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Economic / Master /Monetary-and-banking-economics "} linkSemestre={"/Courses/Economic-Commercial-Management/Economic/Master/Monetary-and-banking-economics"} numSemesters={4} />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Management' element={<CoursesDegree routePath={"All Courses / Economic-Commercial-Management / Management"} linkLicence={"/Courses/Economic-Commercial-Management/Management/Licence"} linkMaster={"/Courses/Economic-Commercial-Management/Management/Master"} />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Management/Licence' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Management / Licence "} linkSemestre={"/Courses/Economic-Commercial-Management/Management/Licence"} numSemesters={4} startSemester={3} />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Management/Master' element={<CoursesMgMaster />}/>
                        <Route path='/Courses/Economic-Commercial-Management/Management/Master/Human-Resource-Management' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Management / Master/Human-Resource-Management "} linkSemestre={"/Courses/Economic-Commercial-Management/Management/Master/Human-Resource-Management"} numSemesters={4}  />}/>
                        <Route path='/Courses/Economic-Commercial-Management/Management/Master/Strategic-management-of-enterprises' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Management / Master/Strategic-management-of-enterprises "} linkSemestre={"/Courses/Economic-Commercial-Management/Management/Master/Strategic-management-of-enterprises"} numSemesters={4}  />}/>
                        <Route path='/Courses/Economic-Commercial-Management/Management/Master/Business-Management' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Management / Master/Business-Management "} linkSemestre={"/Courses/Economic-Commercial-Management/Management/Master/Business-Management"} numSemesters={4}  />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Financial-and-accounting' element={<CoursesDegree routePath={"All Courses / Economic-Commercial-Management / Financial-and-accounting"} linkLicence={"/Courses/Economic-Commercial-Management/Financial-and-accounting/Licence"} linkMaster={"/Courses/Economic-Commercial-Management/Financial-and-accounting/Master"} />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Financial-and-accounting/Licence' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Financial-and-accounting / Licence "} linkSemestre={"/Courses/Economic-Commercial-Management/Financial-and-accounting/Licence"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Economic-Commercial-Management/Financial-and-accounting/Master' element={<CoursesFAMaster/>}/>
                      <Route path='/Courses/Economic-Commercial-Management/Financial-and-accounting/Master/Financial-and-banks' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Financial-and-accounting / Master/ Financial-and-banks"} linkSemestre={"/Courses/Economic-Commercial-Management/Management/Financial-and-accounting/Master/Financial-and-banks"} numSemesters={4} />}/>
                      <Route path='/Courses/Economic-Commercial-Management/Financial-and-accounting/Master/Accounting-and-collection' element={<CoursesSemestre routePath={"All Courses / Economic-Commercial-Management / Financial-and-accounting / Master/ Accounting-and-collection"} linkSemestre={"/Courses/Economic-Commercial-Management/Management/Financial-and-accounting/Master/Accounting-and-collection"} numSemesters={4} />}/>
                  <Route path='/Courses/Sciences-Exactes' element={<CoursesSE />}/>
                    <Route path='/Courses/Sciences-Exactes/Science-of-Matter' element={<CoursesDegree routePath={"All Courses / Sciences-Exactes / Science-of-Matter"} linkLicence={"/Courses/Sciences-Exactes/Science-of-Matter/Licence"} linkMaster={"/Courses/Sciences-Exactes/Science-of-Matter/Master"} />}/>
                      <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Licence' element={<CoursesSEMLicence />}/>
                        <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Licence/Socle-commun' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes /Science-of-Matter/Licence/Socle-commun"} linkSemestre={"/Courses/Sciences-Exactes/Science-of-Matter/Licence/Socle-commun"} numSemesters={4} startSemester={3}/>}/>
                        <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Licence/Chemistry' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes /Science-of-Matter/Licence/Chemistry"} linkSemestre={"/Courses/Sciences-Exactes/Science-of-Matter/Licence/Chemistry"} numSemesters={4} startSemester={3}/>}/>
                        <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Licence/Physique' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes /Science-of-Matter/Licence/Physique"} linkSemestre={"/Courses/Sciences-Exactes/Science-of-Matter/Licence/Physique"} numSemesters={4} startSemester={3}/>}/>
                      <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Master' element={<CoursesSEMaster />}/>
                        <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Master/Analytical-Chemistry' element={<CoursesSemestre routePath={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Analytical-Chemistry"} linkSemestre={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Analytical-Chemistry"} numSemesters={4}/>}/>
                        <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Master/Catalyse' element={<CoursesSemestre routePath={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Catalyse"} linkSemestre={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Catalyse"} numSemesters={4}/>}/>
                        <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Master/Energy-physics-and-renewable-energies' element={<CoursesSemestre routePath={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Energy-physics-and-renewable-energies"} linkSemestre={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Energy-physics-and-renewable-energies"} numSemesters={4}/>}/>
                        <Route path='/Courses/Sciences-Exactes/Science-of-Matter/Master/Materials-physics' element={<CoursesSemestre routePath={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Materials-physics"} linkSemestre={"/Courses/Sciences-Exactes/Science-of-Matter/Master/Materials-physics"} numSemesters={4}/>}/>
                    <Route path='/Courses/Sciences-Exactes/Math-and-Info' element={<CoursesMI/>}/>
                      <Route path='/Courses/Sciences-Exactes/Math-and-Info/Socle-Commun' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Socle Commun "} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Socle-Commun"} numSemesters={2} />}/>
                      <Route path='/Courses/Sciences-Exactes/Math-and-Info/Mathematics' element={<CoursesDegree routePath={"All Courses / Sciences-Exactes / Math-and-Info / Mathematics "} linkLicence={"/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Licence"} linkMaster={"/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Master"}  />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Licence' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Mathematics / Licence "} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Licence"} numSemesters={4} startSemester={3}  />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Master' element={<CoursesMMaster/>}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Master/Mathematical-Analysis' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Mathematics / Master / Mathematical-Analysis"} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Master/Mathematical-Analysis"} numSemesters={4} />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Master/Probability-and-statistics' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Mathematics / Master / Probability-and-statistics"} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Mathematics/Master/Probability-and-statistics"} numSemesters={4} />}/>
                      <Route path='/Courses/Sciences-Exactes/Math-and-Info/Computer-Science' element={<CoursesDegree routePath={"All Courses / Sciences-Exactes / Math-and-Info / Computer-Science "} linkLicence={"/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Licence"} linkMaster={"/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master"}  />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Licence' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Computer-Science / Licence "} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Licence"} numSemesters={4} startSemester={3}  />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master' element={<CoursesMIMaster />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Artificial-Intelligence-and-Decision-making' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Computer-Science / Master /Artificial-Intelligence-and-Decision-making"} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Artificial-Intelligence-and-Decision-making"} numSemesters={4}  />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Advanced-Information-Systems' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Computer-Science / Master /Advanced-Information-Systems"} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Advanced-Information-Systems"} numSemesters={4}  />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Computer-Systems-and-Networks' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Computer-Science / Master /Computer-Systems-and-Networks"} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Computer-Systems-and-Networks"} numSemesters={4}  />}/>
                        <Route path='/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Data-Science-and-Cyber-Security' element={<CoursesSemestre routePath={"All Courses / Sciences-Exactes / Math-and-Info / Computer-Science / Master /Data-Science-and-Cyber-Security"} linkSemestre={"/Courses/Sciences-Exactes/Math-and-Info/Computer-Science/Master/Data-Science-and-Cyber-Security"} numSemesters={4}  />}/>

                  <Route path='/Courses/Science-Nature-and-Life' element={<CoursesNL />}/>
                    <Route path='/Courses/Science-Nature-and-Life/Scole-commun' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Scole-commun"} linkSemestre={"/Courses/Science-Nature-and-Life/Scole-commun"} numSemesters={2} />}/>
                    <Route path='/Courses/Science-Nature-and-Life/Agricultural-Sciences-Engineer' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Agricultural-Sciences-Engineer"} linkSemestre={"All Courses/Science-Nature-and-Life/Agricultural-Sciences-Engineer"} numSemesters={2}  />}/>

                    <Route path='/Courses/Science-Nature-and-Life/Science-of-Agronomic' element={<CoursesDegree routePath={"All Courses / Science-Nature-and-Life / Science-of-Agronomic"} linkCommon={"/Courses/Science-Nature-and-Life/Science-of-Agronomic/Scole-commun"} linkLicence={"/Courses/Science-Nature-and-Life/Science-of-Agronomic/Licence"} linkMaster={"/Courses/Science-Nature-and-Life/Science-of-Agronomic/Master"} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Agronomic/Scole-Commun' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Agronomic / Scole-Commun"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Agronomic/Scole-Commun"} numSemesters={2} startSemester={3}/>}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Agronomic/Licence' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Agronomic / Licence"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Agronomic/Licence"} numSemesters={4} startSemester={5}/>}/>
                    <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology' element={<CoursesDegree routePath={"All Courses / Science-Nature-and-Life / Science-of-Biology"} linkCommon={"/Courses/Science-Nature-and-Life/Science-of-Biology/Scole-commun"} linkLicence={"/Courses/Science-Nature-and-Life/Science-of-Biology/Licence"} linkMaster={"/Courses/Science-Nature-and-Life/Science-of-Biology/Master"} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology/Scole-Commun' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biology / Scole-Commun"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biology/Scole-Commun"} numSemesters={2} startSemester={3} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology/Licence' element={<CoursesBLicence/>}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology/Licence/Molecular-biology' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biology/Licence / Molecular-biology"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biology/Licence/Molecular-biology"} numSemesters={2} startSemester={5} />}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology/Licence/Microbiology' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biology/Licence / Microbiology"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biology/Licence/Microbiology"} numSemesters={2} startSemester={5} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology/Master' element={<CoursesBMaster/>}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology/Master/Molecular-biology' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biology/ Master / Molecular-biology"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biology/Master/Molecular-biology"} numSemesters={4}  />}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Biology/Master/Applied-Microbiology' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biology/ Master / Applied-Microbiology"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biology/Master/Applied-Microbiology"} numSemesters={4}  />}/>
                    <Route path='/Courses/Science-Nature-and-Life/Science-of-Biotechnology' element={<CoursesDegree routePath={"All Courses / Science-Nature-and-Life / Science-of-Biotechnology"} linkCommon={"/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Scole-commun"} linkLicence={"/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Licence"} linkMaster={"/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Master"} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Scole-Commun' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biotechnology / Scole-Commun"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Scole-Commun"} numSemesters={2} startSemester={3} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Licence' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biotechnology / Licence"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Licence"} numSemesters={2} startSemester={5} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Master' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Biotechnology / Master"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Biotechnology/Master"} numSemesters={4}  />}/>
                    <Route path='/Courses/Science-Nature-and-Life/Science-of-Food' element={<CoursesDegree routePath={"All Courses / Science-Nature-and-Life / Science-of-Food"} linkCommon={"/Courses/Science-Nature-and-Life/Science-of-Food/Scole-commun"} linkLicence={"/Courses/Science-Nature-and-Life/Science-of-Food/Licence"} linkMaster={"/Courses/Science-Nature-and-Life/Science-of-Food/Master"} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Food/Scole-Commun' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Food / Scole-Commun"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Food/Scole-Commun"} numSemesters={2} startSemester={3} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Food/Licence' element={<CoursesFLicence/>}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Food/Licence/Agri-food-technology-and-quality-control' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Food / Licence/Agri-food-technology-and-quality-control"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Food/Licence/Agri-food-technology-and-quality-control"} numSemesters={2} startSemester={3} />}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Food/Licence/Food-Nutrition-Pathologies' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Food / Licence/Food-Nutrition-Pathologies"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Food/Licence/Food-Nutrition-Pathologies"} numSemesters={2} startSemester={3} />}/>
                      <Route path='/Courses/Science-Nature-and-Life/Science-of-Food/Master' element={<CoursesFMaster/>}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Food/Master/Agri-food-technology-and-quality-control' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Food / Master/Agri-food-technology-and-quality-control"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Food/Master/Agri-food-technology-and-quality-control"} numSemesters={4} />}/>
                        <Route path='/Courses/Science-Nature-and-Life/Science-of-Food/Master/Food-Nutrition-Pathologies' element={<CoursesSemestre routePath={"All Courses / Science-Nature-and-Life / Science-of-Food / Master/Food-Nutrition-Pathologies"} linkSemestre={"/Courses/Science-Nature-and-Life/Science-of-Food/Master/Food-Nutrition-Pathologies"} numSemesters={4} />}/>
                  <Route path='/Courses/Technology' element={<CoursesTech />}/>
                    <Route path='/Courses/Technology/Civil-engineering' element={<CoursesDegree routePath={"All Courses / Technology / Civil-engineering"} linkLicence={"/Courses/Technology/Civil-engineering/Licence"} linkMaster={"/Courses/Technology/Civil-engineering/Master"} />}/>
                      <Route path='/Courses/Technology/Civil-engineering/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Civil-engineering / Licence"} linkSemestre={"/Courses/Technology/Civil-engineering/Licence"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Mechanical-engineering' element={<CoursesDegree routePath={"All Courses / Technology / Mechanical-engineering"} linkLicence={"/Courses/Technology/Mechanical-engineering/Licence"} linkMaster={"/Courses/Technology/Mechanical-engineering/Master"} />}/>
                      <Route path='/Courses/Technology/Mechanical-engineering/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Mechanical-engineering / Licence"} linkSemestre={"/Courses/Technology/Mechanical-engineering/Licence"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Process-engineering' element={<CoursesDegree routePath={"All Courses / Technology / Process-engineering"} linkLicence={"/Courses/Technology/Process-engineering/Licence"} linkMaster={"/Courses/Technology/Process-engineering/Master"} />}/>
                      <Route path='/Courses/Technology/Process-engineering/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Process-engineering / Licence"} linkSemestre={"/Courses/Technology/Process-engineering/Licence"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Automation' element={<CoursesDegree routePath={"All Courses / Technology / Automation"} linkLicence={"/Courses/Technology/Automation/Licence"} linkMaster={"/Courses/Technology/Automation/Master"} />}/>
                      <Route path='/Courses/Technology/Automation/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Automation / Licence"} linkSemestre={"/Courses/Technology/Automation/Licence"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Electrical-engineering' element={<CoursesDegree routePath={"All Courses / Technology / Electrical-engineering"} linkLicence={"/Courses/Technology/Electrical-engineering/Licence"} linkMaster={"/Courses/Technology/Electrical-engineering/Master"} />}/>
                      <Route path='/Courses/Technology/Electrical-engineering/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Electrical-engineering / Licence"} linkSemestre={"/Courses/Technology/Electrical-engineering/Licence"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Public-works' element={<CoursesDegree routePath={"All Courses / Technology / Public-works"} linkLicence={"/Courses/Technology/Public-works/Licence"} linkMaster={"/Courses/Technology/Public-works/Master"} />}/>
                      <Route path='/Courses/Technology/Public-works/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Public-works / Licence"} linkSemestre={"/Courses/Technology/Public-works/Licence"} numSemesters={4} startSemester={3} />}/>
                      <Route path='/Courses/Technology/Public-works/Master' element={<CoursesSemestre routePath={"All Courses / Technology / Public-works / Master"} linkSemestre={"/Courses/Technology/Public-works/Master"} numSemesters={4}  />}/>
                    <Route path='/Courses/Technology/Electronic' element={<CoursesDegree routePath={"All Courses / Technology / Electronic"} linkLicence={"/Courses/Technology/Electronic/Licence"} linkMaster={"/Courses/Technology/Electronic/Master"} />}/>
                      <Route path='/Courses/Technology/Electronic/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Electronic / Licence"} linkSemestre={"/Courses/Technology/Electronic/Licence"} numSemesters={4} startSemester={3} />}/>
                      <Route path='/Courses/Technology/Electronic/Master' element={<CoursesSemestre routePath={"All Courses / Technology / Electronic / Master"} linkSemestre={"/Courses/Technology/Electronic/Master"} numSemesters={4}  />}/>
                    <Route path='/Courses/Technology/Telecommunication' element={<CoursesDegree routePath={"All Courses / Technology / Telecommunication"} linkLicence={"/Courses/Technology/Telecommunication/Licence"} linkMaster={"/Courses/Technology/Telecommunication/Master"} />}/>
                      <Route path='/Courses/Technology/Telecommunication/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Telecommunication / Licence"} linkSemestre={"/Courses/Technology/Telecommunication/Licence"} numSemesters={4} startSemester={3} />}/>
                      <Route path='/Courses/Technology/Telecommunication/Master' element={<CoursesSemestre routePath={"All Courses / Technology / Telecommunication / Master"} linkSemestre={"/Courses/Technology/Telecommunication/Master"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Hydraulic' element={<CoursesDegree routePath={"All Courses / Technology / Hydraulic"} linkLicence={"/Courses/Technology/Hydraulic/Licence"} linkMaster={"/Courses/Technology/Hydraulic/Master"} />}/>
                      <Route path='/Courses/Technology/Hydraulic/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Hydraulic / Licence"} linkSemestre={"/Courses/Technology/Hydraulic/Licence"} numSemesters={4} startSemester={3} />}/>
                      <Route path='/Courses/Technology/Hydraulic/Master' element={<CoursesSemestre routePath={"All Courses / Technology / Hydraulic / Master"} linkSemestre={"/Courses/Technology/Hydraulic/Master"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Climate-Engineering' element={<CoursesDegree routePath={"All Courses / Technology / Climate-Engineering"} linkLicence={"/Courses/Technology/Climate-Engineering/Licence"} linkMaster={"/Courses/Technology/Climate-Engineering/Master"} />}/>
                      <Route path='/Courses/Technology/Climate-Engineering/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Climate-Engineering / Licence"} linkSemestre={"/Courses/Technology/Climate-Engineering/Licence"} numSemesters={4} startSemester={3} />}/>
                      <Route path='/Courses/Technology/Climate-Engineering/Master' element={<CoursesSemestre routePath={"All Courses / Technology / Climate-Engineering / Master"} linkSemestre={"/Courses/Technology/Climate-Engineering/Master"} numSemesters={4} startSemester={3} />}/>
                    <Route path='/Courses/Technology/Architecture' element={<CoursesDegree routePath={"All Courses / Technology / Architecture"} linkLicence={"/Courses/Technology/Architecture/Licence"} linkMaster={"/Courses/Technology/Architecture/Master"} />}/>
                      <Route path='/Courses/Technology/Architecture/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Architecture / Licence"} linkSemestre={"/Courses/Technology/Architecture/Licence"} numSemesters={6}  />}/>
                      <Route path='/Courses/Technology/Architecture/Master' element={<CoursesSemestre routePath={"All Courses / Technology / Architecture / Master"} linkSemestre={"/Courses/Technology/Architecture/Master"} numSemesters={4}  />}/>
                    <Route path='/Courses/Technology/Engineer-ST' element={<CoursesDegree routePath={"All Courses / Technology / Engineer-ST"} linkLicence={"/Courses/Technology/Engineer-ST/Licence"} linkMaster={"/Courses/Technology/Engineer-ST/Master"} />}/>
                      <Route path='/Courses/Technology/Engineer-ST/Licence' element={<CoursesSemestre routePath={"All Courses / Technology / Engineer-ST / Licence"} linkSemestre={"/Courses/Technology/Engineer-ST/Licence"} numSemesters={4}  />}/>

                {/* apps  */}
                <Route path="/To Do List" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/editor/:blog_id" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/edit Profile" element={<EditProfile />} />
                <Route path="/Change Password" element={<ChangePassword />} />
                <Route path="/Notifications" element={<Notifications />} />

                {/* <Route path="/color-picker" element={<ColorPicker />} /> */}
                {/* create course */}
                <Route path="/Courses/CreateCourse" element={<CourseEditor />} />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};
// coolors choice 
// loading
// map data
export default App;
