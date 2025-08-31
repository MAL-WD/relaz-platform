import * as React from "react";


const LandingPage = () => (
//     <div className="LandingPage w-96 h-96 relative bg-white">
//     <div className="Rectangle11 w-96 h-96 left-[19px] top-[5156px] absolute bg-orange-100 rounded-3xl" />
//     <div className="FirstlyTheCourseContentWasOutstandingItCoveredAWideRangeOfTopicsInCyberSecurityFromCryptingAlgorithmsToDeepTypesToDefenseAttackersInAComprehensiveAndDeepAccessibleMannerTheInstructorWasKnowledgeableAndEngaging w-96 left-[81px] top-[5580px] absolute"><span style="text-amber-900 text-lg font-medium font-['Onest'] leading-tight">“ Firstly ,the course content was outstanding. it covered a <br/>wide range of topics in Cyber-Security, from crypting algorithms<br/>to deep types to defense attackers in a comprehensive and deep accessible manner. <br/></span><span style="text-amber-400 text-lg font-medium font-['Onest'] leading-tight">the instructor was knowledgeable and engaging .” </span></div>
//     <div className="OurFullLaunchIsJustAroundTheCornerBringingAWealthOfNewCoursesAndFeaturesToEnhanceYourLearningJourneyStayTunedToExploreOurExpandedOfferingsAndDonTForgetToRequestYourDesiredCoursesToShapeOurFutureCumculumAccordingToYourInterestsAndNeeds w-96 left-[81px] top-[6546px] absolute"><span style="text-stone-950 text-lg font-medium font-['Onest'] leading-tight"> Our full launch is just around the corner, </span><span style="text-yellow-400/opacity-95 text-lg font-medium font-['Onest'] leading-tight">bringing a wealth of new courses and features to enhance your learning journey</span><span style="text-stone-950 text-lg font-medium font-['Onest'] leading-tight">. Stay tuned to explore our expanded offerings and don t forget to request your desired courses to shape our future cumculum according to your Interests and needs.<br/></span></div>
//     <div className="Frame1 left-[502px] top-[33px] absolute justify-start items-start gap-12 inline-flex">
//       <div className="Home text-stone-950 text-xl font-semibold font-['Poppins']">Home</div>
//       <div className="About text-stone-950 text-xl font-semibold font-['Poppins']">About</div>
//       <div className="Courses text-stone-950 text-xl font-semibold font-['Poppins']">Courses</div>
//       <div className="Blogs text-stone-950 text-xl font-semibold font-['Poppins']">Blogs</div>
//     </div>
//     <div className="ELearning left-[140px] top-[33px] absolute text-stone-950 text-xl font-semibold font-['Poppins']">E-learning</div>
//     <img className="Logo1 w-14 h-11 left-[76px] top-[27px] absolute" src="https://via.placeholder.com/53x44" />
//     <div className="Frame2 w-32 h-14 px-8 py-3.5 left-[1236px] top-[20px] absolute rounded-3xl border border-stone-950 justify-center items-center gap-2.5 inline-flex">
//       <div className="SignIn text-stone-950 text-xl font-medium font-['Poppins']">Sign In</div>
//     </div>
//     <div className="Frame9 w-32 h-14 px-8 py-3.5 left-[1090px] top-[20px] absolute bg-stone-950 rounded-3xl border border-stone-950 justify-center items-center gap-2.5 inline-flex">
//       <div className="SignUp text-white text-xl font-medium font-['Poppins']">Sign Up</div>
//     </div>
//     <img className="Rectangle1 w-96 h-96 left-[80px] top-[100px] absolute rounded-3xl" src="https://via.placeholder.com/1280x825" />
//     <div className="WhereEductionBloomsAlive left-[178px] top-[653px] absolute"><span style="text-white text-8xl font-semibold font-['Poppins'] leading-10">Where </span><span style="text-amber-400 text-8xl font-semibold font-['Poppins'] leading-10">eduction<br/></span><span style="text-white text-8xl font-semibold font-['Poppins'] leading-10">blooms</span><span style="text-amber-400 text-8xl font-semibold font-['Poppins'] leading-10"> alive</span><span style="text-white text-8xl font-semibold font-['Poppins'] leading-10">.</span></div>
//     <div className="InnovativeSolutionsForELearning w-96 h-48 left-[80px] top-[1059px] absolute"><span style="text-black text-8xl font-semibold font-['Onest'] leading-10">Innovative Solutions </span><span style="text-violet-500 text-8xl font-semibold font-['Onest'] leading-10">for E-</span><span style="text-violet-500 text-8xl font-semibold font-['Onest'] leading-10">Learning</span></div>
//     <div className="AboutOurPlatform w-60 h-9 left-[100px] top-[1022px] absolute text-violet-500 text-2xl font-medium font-['Onest'] leading-snug">About our platform</div>
//     <div className="OurMissionIsToEmpowerEducationThroughDigitalInnovationWeReDedicatedToTransformingLearningByLeveragingModernTechnologyToCreateAccessibleEngagingAndEffectiveEducationalExperiencesForAllStudents w-96 h-36 left-[961px] top-[1086px] absolute text-stone-950/opacity-95 text-lg font-normal font-['Onest'] leading-snug">Our mission is to empower education through digital innovation. We're dedicated to transforming learning by leveraging modern technology to create accessible, engaging, and effective educational experiences for all Students.</div>
//     <div className="ExpandYourKnowledgeHorizon w-96 h-52 left-[81px] top-[1669px] absolute"><span style="text-black text-8xl font-semibold font-['Onest'] leading-10">Expand your<br/></span><span style="text-lime-600 text-8xl font-semibold font-['Onest'] leading-10">knowledge Horizon.</span></div>
//     <div className="ShareWithOthersLessonsStoriesExperiences w-96 h-44 left-[76px] top-[3890px] absolute"><span style="text-black text-8xl font-semibold font-['Onest'] leading-10">Share with others<br/></span><span style="text-sky-700 text-7xl font-semibold font-['Onest'] leading-10">Lessons, Stories, Experiences<br/></span><span style="text-sky-700 text-8xl font-semibold font-['Onest'] leading-10"><br/></span></div>
//     <div className="WhatAreYouWaitingForStartLearningFormYourBedNow w-96 h-96 left-[76px] top-[6099px] absolute"><span style="text-stone-950 text-8xl font-semibold font-['Onest'] leading-10">what are you waiting for?<br/></span><span style="text-amber-400/opacity-95 text-8xl font-semibold font-['Onest'] leading-10">Start learning form your bed Now.</span></div>
//     <div className="DiscoverWhatWhatOurStudentFeelOf w-96 h-44 left-[83px] top-[5282px] absolute"><span style="text-black text-8xl font-semibold font-['Onest'] leading-10">Discover what <br/></span><span style="text-amber-900 text-8xl font-semibold font-['Onest'] leading-10">what our student feel of</span></div>
//     <div className="LearnAnythingYouWantAnytimeAndAnywhere w-96 h-44 left-[76px] top-[3085px] absolute"><span style="text-black text-8xl font-semibold font-['Onest'] leading-10">Learn anything you want<br/></span><span style="text-teal-500 text-7xl font-semibold font-['Onest'] leading-10">Anytime and Anywhere<br/></span><span style="text-sky-700 text-8xl font-semibold font-['Onest'] leading-10"><br/></span></div>
//     <div className="ExploreOurCourses w-60 h-8 left-[86px] top-[1618px] absolute text-lime-600 text-2xl font-medium font-['Onest'] leading-snug">explore our courses</div>
//     <div className="ExploreOurBlogs w-52 h-8 left-[81px] top-[3841px] absolute text-sky-700 text-2xl font-medium font-['Onest'] leading-snug">explore our blogs</div>
//     <div className="LearnFromYourGrandmothersSEmbrace w-96 h-8 left-[81px] top-[6050px] absolute text-amber-400 text-2xl font-medium font-['Onest'] leading-snug">learn from your grandmothers’s embrace</div>
//     <div className="StudentsSatisfactions w-64 h-8 left-[83px] top-[5233px] absolute text-amber-900 text-2xl font-medium font-['Onest'] leading-snug">Students Satisfactions</div>
//     <div className="ExploreOurFaculties w-64 h-8 left-[81px] top-[3036px] absolute text-teal-500 text-2xl font-medium font-['Onest'] leading-snug">explore our Faculties</div>
//     <div className="InteractiveEngagingAndAccessibleEducationForAllAnytimeAndAnywhere w-80 left-[904px] top-[275px] absolute text-white text-base font-medium font-['Onest'] leading-none">Interactive, Engaging, and Accessible Education for All, Anytime and Anywhere.</div>
//     <div className="Rectangle3 w-32 h-10 left-[904px] top-[327px] absolute bg-amber-400 rounded-3xl" />
//     <div className="Rectangle4 w-28 h-9 left-[1046px] top-[327px] absolute rounded-3xl border border-neutral-100" />
//     <div className="StartLearning left-[921px] top-[340px] absolute text-stone-950 text-sm font-medium font-['Onest'] leading-3">Start Learning</div>
//     <div className="LearnMore left-[1066px] top-[339px] absolute text-white text-sm font-medium font-['Onest'] leading-3">Learn More</div>
//     <div className="Group1 w-96 h-64 left-[80px] top-[1274px] absolute">
//       <div className="Frame3 w-80 h-11 left-[21.53px] top-[25.57px] absolute justify-start items-center gap-4 inline-flex">
//         <div className="Ellipse1 w-11 h-11 bg-violet-500/opacity-70 rounded-full" />
//         <div className="LearnFromAnywhere text-black text-2xl font-semibold font-['Onest']">Learn From Anywhere</div>
//       </div>
//       <div className="VuesaxLinearHome w-6 h-6 left-[30.75px] top-[35.16px] absolute flex-col justify-center items-center inline-flex">
//         <div className="Home w-6 h-6 relative">
//         </div>
//       </div>
//       <div className="ExperienceTheConvenienceOfLearningFromTheComfortOfYourOwnGrandparentSHouseOrOnTheGoWithAccessToAWideRangeOfCoursesAndArticlesAvailableOnOurPlatform w-80 h-32 left-[21.53px] top-[87.38px] absolute text-black/opacity-60 text-lg font-medium font-['Onest']">Experience the convenience of learning from the comfort of your own grandparent’s house or on the go, with access to a wide range of courses and articles available on our platform.</div>
//     </div>
//     <div className="Group3 w-96 h-64 left-[950px] top-[1274px] absolute">
//       <div className="Frame3 w-80 h-11 left-[21.52px] top-[25.57px] absolute">
//         <div className="Ellipse1 w-11 h-11 left-0 top-0 absolute bg-violet-500/opacity-70 rounded-full" />
//         <div className="VuesaxLinearHeart w-6 h-6 left-[60px] top-[9.50px] absolute" />
//         <div className="Heart w-6 h-6 left-[10.25px] top-[10.66px] absolute">
//         </div>
//         <div className="InteractiveFeatures left-[53px] top-[5.50px] absolute text-black text-2xl font-semibold font-['Onest']">Interactive Features</div>
//       </div>
//       <div className="ImmerseYourselfInAnEngagingLearningEnvironmentWhereYouCanInteractWithCourseMaterialsTeacherAndFellowLearnersThroughLikesCommentsAndDiscussions w-80 h-32 left-[21.52px] top-[87.38px] absolute text-black/opacity-60 text-lg font-medium font-['Onest']">Immerse yourself in an engaging learning environment where you can interact with course materials, teacher, and fellow learners through likes, comments, and discussions.</div>
//     </div>
//     <div className="Group2 w-96 h-64 left-[515px] top-[1274px] absolute">
//       <div className="Frame3 w-96 h-11 left-[21px] top-[25.57px] absolute">
//         <div className="VuesaxLinearBookSquare w-6 h-6 left-0 top-[9.50px] absolute" />
//         <div className="Ellipse1 w-11 h-11 left-0 top-0 absolute bg-violet-500/opacity-70 rounded-full" />
//         <div className="ExploreCoursesArticles left-[53px] top-[6px] absolute text-zinc-100 text-2xl font-semibold font-['Onest']">Explore Courses & Articles</div>
//         <div className="BookSquare w-6 h-6 left-[9px] top-[8.43px] absolute">
//           <div className="Group w-3 h-3 left-[5.62px] top-[6.30px] absolute">
//           </div>
//         </div>
//       </div>
//       <div className="DiveIntoAWealthOfKnowledgeWithOurDiverseRangeOfCoursesAndArticlesFromStructuredLearningExperiencesToInsightfulArticlesCreatedByTeachersAndStudents w-96 h-32 left-[21px] top-[87.38px] absolute"><span style="text-zinc-100 text-lg font-medium font-['Onest']">Dive into a wealth of knowledge with our diverse range of courses and articles. From structured learning experiences to insightful articles created by </span><span style="text-zinc-100 text-lg font-bold font-['Onest']">teachers and Students</span></div>
//     </div>
//     <div className="Rectangle2 w-96 h-96 left-[18px] top-[1874px] absolute bg-lime-50 rounded-3xl" />
//     <div className="Group17 w-96 h-96 left-[81px] top-[1929px] absolute">
//       <div className="Group6 w-96 h-96 left-0 top-0 absolute">
//         <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-white rounded-3xl" />
//         <div className="MohamedLazreg w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Mohamed Lazreg</div>
//         <div className="LearnFundamentalAlgorithmsInJavascriptIdealForBeginnersThisCourseFocusesOnPracticalCodingExercisesToBuildYourProblemSolvingSkills w-80 left-[17.73px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Learn fundamental algorithms in javascript, Ideal for beginners, this course focuses on practical coding exercises to build your problem-solving skills.</div>
//         <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//         <div className="Group4 w-28 h-6 left-[17.73px] top-[199px] absolute">
//           <div className="Rectangle8 w-28 h-6 left-0 top-0 absolute bg-blue-400/opacity-50 rounded-md" />
//           <div className="ComputerScience w-24 left-[8.27px] top-[6px] absolute text-blue-400 text-xs font-medium font-['Onest'] leading-3">Computer science</div>
//         </div>
//         <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//         <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//         <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//           <div className="VuesaxLinearMedal w-6 h-6 justify-center items-center flex">
//             <div className="Medal w-6 h-6 relative">
//             </div>
//           </div>
//           <div className="License1 text-black text-base font-medium font-['Onest'] leading-none">License 1</div>
//         </div>
//         <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//           <div className="Eye w-6 h-6 relative">
//           </div>
//           <div className="K text-black text-base font-medium font-['Onest'] leading-none">2k</div>
//         </div>
//       </div>
//       <div className="LearnAlgorithmBasicsWithJavascriptLanguage w-80 left-[18px] top-[235px] absolute text-stone-950 text-2xl font-medium font-['Onest'] leading-snug">Learn algorithm basics with <br/>javascript language</div>
//     </div>
//     <div className="Group19 w-96 h-96 left-[81px] top-[4093px] absolute">
//       <div className="Group6 w-96 h-96 left-0 top-0 absolute">
//         <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-zinc-100 rounded-3xl" />
//         <div className="BenaliKhaled w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Benali khaled</div>
//         <div className="VisualStudioCodeIsOneOfTheMostWidelyUsedSourceCodeEditorsOutThereInstallThesePowerfulVscodeExtensionsToImproveYourProductivityDuringWebDevelopment w-80 left-[18px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Visual Studio Code is one of the most widely-used source code editors out there, Install these powerful VSCode extensions to  improve your productivity during web development. </div>
//         <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//         <div className="Group4 w-28 h-6 left-[17.73px] top-[199px] absolute">
//           <div className="Rectangle8 w-28 h-6 left-0 top-0 absolute bg-blue-400/opacity-50 rounded-md" />
//           <div className="ComputerScience w-24 left-[8.27px] top-[6px] absolute text-blue-400 text-xs font-medium font-['Onest'] leading-3">Computer science</div>
//         </div>
//         <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//         <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//         <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//           <div className="VuesaxOutlineClock w-6 h-6 justify-center items-center flex">
//             <div className="Clock w-6 h-6 relative">
//             </div>
//           </div>
//           <div className="MinRead text-black text-base font-medium font-['Onest'] leading-none">6 min read</div>
//         </div>
//         <div className="Frame5 w-12 h-6 left-[324px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//           <div className="Eye w-6 h-6 relative">
//           </div>
//           <div className="K text-black text-base font-medium font-['Onest'] leading-none">100k</div>
//         </div>
//       </div>
//       <div className="MustHaveVscodeExtensionsForWebDevelopment w-96 left-[18px] top-[235px] absolute text-stone-950 text-2xl font-medium font-['Onest'] leading-snug">10 Must-Have VSCode Extensions for Web Development 👀💻</div>
//     </div>
//     <div className="Group22 w-96 h-96 left-[81px] top-[4599px] absolute">
//       <div className="Group6 w-96 h-96 left-0 top-0 absolute">
//         <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-zinc-100 rounded-3xl" />
//         <div className="SariaYacine w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">saria yacine</div>
//         <div className="AllowMeToIntroduceTheThirdInstallmentOfMySeriesTitled3EssentialKeysToBeConfidentEnglishLearners w-80 left-[17.73px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Allow me to introduce the third installment of my series, titled ” 3 Essential Keys to be Confident English Learners”.</div>
//         <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//         <div className="Group4 w-28 h-6 left-[18px] top-[199px] absolute">
//           <div className="Rectangle8 w-14 h-6 left-0 top-0 absolute bg-violet-500/opacity-50 rounded-md" />
//           <div className="English w-24 left-[8px] top-[6px] absolute text-violet-500 text-xs font-medium font-['Onest'] leading-3">English</div>
//         </div>
//         <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//         <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//         <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//           <div className="VuesaxOutlineClock w-6 h-6 justify-center items-center flex">
//             <div className="Clock w-6 h-6 relative">
//             </div>
//           </div>
//           <div className="MinRead text-black text-base font-medium font-['Onest'] leading-none">6 min read</div>
//         </div>
//         <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//           <div className="Eye w-6 h-6 relative">
//           </div>
//           <div className="K text-black text-base font-medium font-['Onest'] leading-none">6k</div>
//         </div>
//       </div>
//       <div className="EssentialKeysToBeConfidentEnglishLearners w-80 left-[18px] top-[235px] absolute text-stone-950 text-2xl font-medium font-['Onest'] leading-snug">3 Essential Keys to be Confident English Learners</div>
//     </div>
//     <div className="Group20 w-96 h-96 left-[517px] top-[4093px] absolute">
//       <div className="Group6 w-96 h-96 left-0 top-0 absolute">
//         <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-zinc-100 rounded-3xl" />
//         <div className="Benhmade w-40 left-[62px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Benhmade</div>
//         <div className="WithTheExcitingReleaseOfFlutter322DuringGoogleIO2024AndOfCourseTheLoveThePreviousArticleAboutMyFavoritePackagesDuringDevelopingFlutterApps w-80 left-[17.73px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">With the exciting release of Flutter 3.22 during Google I/O 2024 and of course the love the previous article about my favorite packages during developing Flutter apps.</div>
//         <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//         <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//         <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//         <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//           <div className="VuesaxOutlineClock w-6 h-6 justify-center items-center flex">
//             <div className="Clock w-6 h-6 relative">
//             </div>
//           </div>
//           <div className="MinRead text-black text-base font-medium font-['Onest'] leading-none">6 min read</div>
//         </div>
//         <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//           <div className="Eye w-6 h-6 relative">
//           </div>
//           <div className="M text-black text-base font-medium font-['Onest'] leading-none">1M</div>
//         </div>
//       </div>
//       <div className="ExtraPackagesToUseWithFlutter322In2024 w-80 left-[18px] top-[235px] absolute text-stone-950 text-2xl font-medium font-['Onest'] leading-snug">5 extra packages to use with Flutter 3.22 in 2024</div>
//     </div>
//     <div className="Group23 w-96 h-96 left-[90px] top-[4599px] absolute">
//       <div className="Group6 w-96 h-96 left-0 top-0 absolute">
//         <div className="Rectangle6 w-96 h-96 left-[427px] top-0 absolute bg-zinc-100 rounded-3xl" />
//         <div className="Saad w-32 left-[489.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Saad </div>
//         <div className="Saad w-32 left-[44.05px] top-[942px] absolute text-amber-900 text-base font-medium font-['Onest'] leading-none">Saad </div>
//         <div className="LearnFundamentalAlgorithmsInReactIdealForBeginnersThisArticleFocusesOnPracticalCodingExercisesToBuildYourProblemSolvingSkills w-80 left-[444.73px] top-[268px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Learn fundamental algorithms in react, Ideal for beginners, this article focuses on practical coding exercises to build your problem-solving skills.</div>
//         <img className="Rectangle7 w-96 h-44 left-[444.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//         <div className="Group4 w-28 h-6 left-[444.73px] top-[199px] absolute">
//           <div className="Rectangle8 w-28 h-6 left-0 top-0 absolute bg-blue-400/opacity-50 rounded-md" />
//           <div className="ComputerScience w-24 left-[8.27px] top-[6px] absolute text-blue-400 text-xs font-medium font-['Onest'] leading-3">Computer science</div>
//         </div>
//         <div className="Line1 w-96 h-px left-[445.84px] top-[371px] absolute border border-neutral-200"></div>
//         <img className="Ellipse2 w-7 h-7 left-[445px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//         <img className="Ellipse3 w-7 h-7 left-0 top-[934px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//         <div className="Frame5 w-24 h-6 left-[442.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//           <div className="VuesaxOutlineClock w-6 h-6 justify-center items-center flex">
//             <div className="Clock w-6 h-6 relative">
//             </div>
//           </div>
//           <div className="MinRead text-black text-base font-medium font-['Onest'] leading-none">10 min read</div>
//         </div>
//         <div className="Frame5 w-12 h-6 left-[761.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//           <div className="Eye w-6 h-6 relative">
//           </div>
//           <div className="K text-black text-base font-medium font-['Onest'] leading-none">30k</div>
//         </div>
//       </div>
//       <div className="RoadmapToMasteringReact w-80 left-[445px] top-[235px] absolute text-stone-950 text-2xl font-medium font-['Onest'] leading-snug">roadmap to mastering react</div>
//     </div>
//     <div className="Group21 w-96 h-96 left-[953px] top-[4091px] absolute">
//       <div className="Group9 w-96 h-96 left-0 top-0 absolute">
//         <div className="Group6 w-96 h-96 left-0 top-0 absolute">
//           <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-zinc-100 rounded-3xl" />
//           <div className="AnasBenyamine w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Anas Benyamine</div>
//           <div className="GoingFromLabcoatToLeader w-80 left-[17.73px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Going from labcoat to leader.<br/></div>
//           <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//           <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//           <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//           <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//             <div className="VuesaxOutlineClock w-6 h-6 justify-center items-center flex">
//               <div className="Clock w-6 h-6 relative">
//               </div>
//             </div>
//             <div className="MinRead text-black text-base font-medium font-['Onest'] leading-none">6 min read</div>
//           </div>
//           <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//             <div className="Eye w-6 h-6 relative">
//             </div>
//             <div className="K text-black text-base font-medium font-['Onest'] leading-none">2k</div>
//           </div>
//         </div>
//         <div className="Rectangle8 w-16 h-6 left-[22px] top-[199px] absolute bg-red-700/opacity-50 rounded-md" />
//         <div className="Pharmacy w-14 left-[30px] top-[205px] absolute text-red-700 text-xs font-medium font-['Onest'] leading-3">pharmacy</div>
//       </div>
//       <div className="TheCoursePharmacySchoolsShouldTeach w-80 left-[18px] top-[235px] absolute text-stone-950 text-2xl font-medium font-['Onest'] leading-snug">The Course Pharmacy Schools Should Teach</div>
//     </div>
//     <div className="Group24 w-96 h-96 left-[953px] top-[4597px] absolute">
//       <div className="Group6 w-96 h-96 left-0 top-0 absolute">
//         <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-zinc-100 rounded-3xl" />
//         <div className="BoukhlkhalWissal w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Boukhlkhal wissal</div>
//         <div className="EveryPersonWhoWantsToBecomeAUiUxDesignerFacesTheQuestionWhereDoIStartIVeBeenDoingDesignForMoreThan14YearsButLikeEveryoneElseIHadToStartSomewhere w-96 left-[18px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Every person who wants to become a UI/UX designer faces the question ‘Where do I start?’.  I’ve been doing design for more than 14 years, but like everyone else, I had to start somewhere.</div>
//         <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//         <div className="Group4 w-20 h-6 left-[17.73px] top-[199px] absolute">
//           <div className="Rectangle8 w-20 h-6 left-0 top-0 absolute bg-fuchsia-500/opacity-30 rounded-md" />
//           <div className="UiUxDesign w-20 left-[5.81px] top-[6px] absolute text-fuchsia-500 text-xs font-medium font-['Onest'] leading-3">ui/ux design</div>
//         </div>
//         <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//         <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//         <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//           <div className="VuesaxOutlineClock w-6 h-6 justify-center items-center flex">
//             <div className="Clock w-6 h-6 relative">
//             </div>
//           </div>
//           <div className="MinRead text-black text-base font-medium font-['Onest'] leading-none">6 min read</div>
//         </div>
//         <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//           <div className="Eye w-6 h-6 relative">
//           </div>
//           <div className="K text-black text-base font-medium font-['Onest'] leading-none">2k</div>
//         </div>
//       </div>
//       <div className="MyLifeLessonsAfter14YearsInUiUxDesign w-80 left-[18px] top-[235px] absolute text-stone-950 text-2xl font-medium font-['Onest'] leading-snug">My life lessons after 14 years in UI/UX design</div>
//     </div>
//     <div className="Group6 w-96 h-96 left-[81px] top-[2431px] absolute">
//       <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-white rounded-3xl" />
//       <div className="BadriBendahane w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">badri bendahane</div>
//       <div className="DevelopingSkillsInTranslatingAndInterpretingBetweenArabicAndAnotherLanguageTopicsIncludeTranslationTheoryTechniquesAndPracticeInVariousContexts w-80 left-[17.73px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">developing skills in translating and interpreting between Arabic and another language. Topics include translation theory, techniques, and practice in various contexts.</div>
//       <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//       <div className="Group4 w-12 h-6 left-[18px] top-[199px] absolute">
//         <div className="Rectangle8 w-12 h-6 left-0 top-0 absolute bg-yellow-300/opacity-50 rounded-md" />
//         <div className="Arabic w-10 left-[8px] top-[6px] absolute text-yellow-400 text-xs font-medium font-['Onest'] leading-3">Arabic</div>
//       </div>
//       <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//       <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//       <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//         <div className="VuesaxLinearMedal w-6 h-6 justify-center items-center flex">
//           <div className="Medal w-6 h-6 relative">
//           </div>
//         </div>
//         <div className="License3 text-black text-base font-medium font-['Onest'] leading-none">License 3</div>
//       </div>
//       <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//         <div className="Eye w-6 h-6 relative">
//         </div>
//         <div className="K text-black text-base font-medium font-['Onest'] leading-none">2k</div>
//       </div>
//     </div>
//     <div className="Group7 w-96 h-96 left-[517px] top-[1929px] absolute">
//       <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-white rounded-3xl" />
//       <div className="GhellalNasreddine w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Ghellal Nasreddine</div>
//       <div className="LearnTheBasicsOfPricePsychologyInThisQuickArticle w-96 left-[19px] top-[290px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Learn the basics of price psychology in this quick article<br/></div>
//       <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//       <div className="Group4 w-20 h-6 left-[18px] top-[199px] absolute">
//         <div className="Rectangle8 w-20 h-6 left-0 top-0 absolute bg-orange-400/opacity-50 rounded-md" />
//         <div className="Psychology w-16 left-[8px] top-[6px] absolute text-orange-400 text-xs font-medium font-['Onest'] leading-3">psychology</div>
//       </div>
//       <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//       <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//       <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//         <div className="VuesaxLinearMedal w-6 h-6 justify-center items-center flex">
//           <div className="Medal w-6 h-6 relative">
//           </div>
//         </div>
//         <div className="Doctora text-black text-base font-medium font-['Onest'] leading-none">doctora</div>
//       </div>
//       <div className="Frame5 w-16 h-6 left-[321px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//         <div className="Eye w-6 h-6 relative">
//         </div>
//         <div className="K text-black text-base font-medium font-['Onest'] leading-none">50k</div>
//       </div>
//     </div>
//     <div className="Group7 w-96 h-96 left-[517px] top-[2431px] absolute">
//       <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-white rounded-3xl" />
//       <div className="OmarBendahane w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Omar Bendahane</div>
//       <div className="CoveringMajorBodySystemsAndTheirFunctionsForBeginnersInterestedInMedicineOrBiologyFeaturingInteractiveLessonsAndPracticalExercisesToEnhanceYourUnderstandingOfTheHumanBody w-96 left-[18px] top-[268px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none"> covering major body systems and their functions. for beginners interested in medicine or biology, featuring interactive lessons and practical exercises to enhance your understanding of the human body.</div>
//       <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//       <div className="Group4 w-20 h-6 left-[18px] top-[199px] absolute">
//         <div className="Rectangle8 w-20 h-6 left-0 top-0 absolute bg-stone-400/opacity-60 rounded-md" />
//         <div className="Architecture w-16 left-[5px] top-[6px] absolute text-orange-400 text-xs font-medium font-['Onest'] leading-3">architecture</div>
//       </div>
//       <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//       <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//       <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//         <div className="VuesaxLinearMedal w-6 h-6 justify-center items-center flex">
//           <div className="Medal w-6 h-6 relative">
//           </div>
//         </div>
//         <div className="License1 text-black text-base font-medium font-['Onest'] leading-none">License 1</div>
//       </div>
//       <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//         <div className="Eye w-6 h-6 relative">
//         </div>
//         <div className="K text-black text-base font-medium font-['Onest'] leading-none">2k</div>
//       </div>
//     </div>
//     <div className="Group8 w-96 h-96 left-[953px] top-[1929px] absolute">
//       <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-white rounded-3xl" />
//       <div className="AchrafZazi w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">Achraf zazi</div>
//       <div className="GainASolidFoundationInBusinessManagementPrinciplesIncludingPlanningOrganizingLeadingAndControllingThisCourseCoversEssentialTopicsSuchAsStrategicPlanningOrganizationalBehaviorAndEffectiveLeadership w-96 left-[18px] top-[266px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Gain a solid foundation in business management principles, including planning, organizing, leading, and controlling. This course covers essential topics such as strategic planning, organizational behavior, and effective leadership.</div>
//       <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//       <div className="Group4 w-28 h-6 left-[18px] top-[199px] absolute">
//         <div className="Rectangle8 w-24 h-6 left-0 top-0 absolute bg-blue-400/opacity-50 rounded-md" />
//         <div className="Management w-24 left-[8px] top-[6px] absolute text-blue-400 text-xs font-medium font-['Onest'] leading-3">Management</div>
//       </div>
//       <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//       <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//       <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//         <div className="VuesaxLinearMedal w-6 h-6 justify-center items-center flex">
//           <div className="Medal w-6 h-6 relative">
//           </div>
//         </div>
//         <div className="Master1 text-black text-base font-medium font-['Onest'] leading-none">Master 1</div>
//       </div>
//       <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//         <div className="Eye w-6 h-6 relative">
//         </div>
//         <div className=" text-black text-base font-medium font-['Onest'] leading-none">546</div>
//       </div>
//     </div>
//     <div className="Group8 w-96 h-96 left-[953px] top-[2431px] absolute">
//       <div className="Rectangle6 w-96 h-96 left-0 top-0 absolute bg-white rounded-3xl" />
//       <div className="KheiroBatti w-32 left-[62.05px] top-[391px] absolute text-black/opacity-60 text-base font-medium font-['Onest'] leading-none">kheiro batti</div>
//       <div className="GainASolidFoundationInBusinessManagementPrinciplesIncludingPlanningOrganizingLeadingAndControllingThisCourseCoversEssentialTopicsSuchAsStrategicPlanningOrganizationalBehaviorAndEffectiveLeadership w-96 left-[18px] top-[266px] absolute text-black/opacity-60 text-base font-normal font-['Onest'] leading-none">Gain a solid foundation in business management principles, including planning, organizing, leading, and controlling. This course covers essential topics such as strategic planning, organizational behavior, and effective leadership.</div>
//       <img className="Rectangle7 w-96 h-44 left-[17.73px] top-[14px] absolute rounded-2xl" src="https://via.placeholder.com/370x172" />
//       <div className="Group4 w-14 h-6 left-[18px] top-[199px] absolute">
//         <div className="Rectangle8 w-14 h-6 left-0 top-0 absolute bg-red-700/opacity-50 rounded-md" />
//         <div className="English w-11 left-[8px] top-[6px] absolute text-red-700 text-xs font-medium font-['Onest'] leading-3">English</div>
//       </div>
//       <div className="Line1 w-96 h-px left-[18.84px] top-[371px] absolute border border-neutral-200"></div>
//       <img className="Ellipse2 w-7 h-7 left-[18px] top-[383px] absolute rounded-full" src="https://via.placeholder.com/30x30" />
//       <div className="Frame5 w-24 h-6 left-[15.51px] top-[428px] absolute justify-start items-center gap-0.5 inline-flex">
//         <div className="VuesaxLinearMedal w-6 h-6 justify-center items-center flex">
//           <div className="Medal w-6 h-6 relative">
//           </div>
//         </div>
//         <div className="Master1 text-black text-base font-medium font-['Onest'] leading-none">Master 1</div>
//       </div>
//       <div className="Frame5 w-12 h-6 left-[334.62px] top-[428px] absolute justify-start items-center gap-1 inline-flex">
//         <div className="Eye w-6 h-6 relative">
//         </div>
//         <div className="K text-black text-base font-medium font-['Onest'] leading-none">2k</div>
//       </div>
//     </div>
//     <div className="Frame8 w-96 h-96 left-[81px] top-[3314px] absolute">
//       <div className="Frame6 w-96 h-44 left-0 top-0 absolute">
//         <div className="PolicyRoundSvgrepoCom1 w-12 h-12 left-[122px] top-[12px] absolute" />
//         <div className="Group19 w-72 h-44 left-0 top-0 absolute">
//           <div className="Rectangle9 w-72 h-44 left-0 top-0 absolute bg-amber-400/opacity-95 rounded-3xl shadow" />
//           <div className="RightsAndPoliticalSciences w-72 h-14 left-[13px] top-[69px] absolute text-center text-white text-3xl font-semibold font-['Onest'] leading-relaxed">Rights and political Sciences</div>
//           <div className="Courses10 left-[109px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//         </div>
//         <div className="DoctorBagSvgrepoCom1 w-10 h-10 left-[481px] top-[16px] absolute" />
//         <div className="Group21 w-72 h-44 left-[326px] top-0 absolute">
//           <div className="Group20 w-72 h-44 left-0 top-0 absolute">
//             <div className="Rectangle9 w-72 h-44 left-0 top-0 absolute bg-red-900 rounded-3xl shadow" />
//             <div className="MedicineAndPharmacy w-72 h-14 left-[13px] top-[69px] absolute text-center text-white text-3xl font-semibold font-['Onest'] leading-relaxed">Medicine and pharmacy</div>
//             <div className="Courses10 left-[109px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//           </div>
//         </div>
//         <div className="Group20 w-72 h-44 left-[652px] top-0 absolute">
//           <div className="Rectangle9 w-72 h-44 left-0 top-0 absolute bg-violet-500 rounded-3xl shadow" />
//           <div className="LiteraturesAndLanguages w-72 h-14 left-[13px] top-[64px] absolute text-center text-white text-3xl font-semibold font-['Onest'] leading-relaxed">Literatures and languages</div>
//           <div className="Courses10 left-[109px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//         </div>
//         <div className="Group20 w-72 h-44 left-[978px] top-0 absolute">
//           <div className="Rectangle9 w-72 h-44 left-0 top-0 absolute bg-orange-400 rounded-3xl shadow" />
//           <div className="HumanitiesAndSocialSciences w-72 h-14 left-[13px] top-[64px] absolute text-center text-white text-3xl font-semibold font-['Onest'] leading-relaxed">Humanities and Social sciences</div>
//           <div className="Courses10 left-[109px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//         </div>
//         <div className="LanguagesSvgrepoCom1 w-10 h-10 left-[781px] top-[13px] absolute" />
//         <div className="Brain13SvgrepoCom1 w-10 h-10 left-[1108px] top-[13px] absolute">
//           <div className="Group w-9 h-10 left-[2.92px] top-[-0px] absolute">
//           </div>
//         </div>
//       </div>
//       <div className="Frame7 w-72 h-44 left-0 top-[210px] absolute">
//         <div className="Group19 w-72 h-44 left-0 top-0 absolute">
//           <div className="Rectangle9 w-72 h-44 left-0 top-0 absolute bg-green-800 rounded-3xl shadow" />
//           <div className="EconomicCommercialManagementSciences w-72 h-14 left-0 top-[69px] absolute text-center text-white text-2xl font-semibold font-['Onest'] leading-normal">Economic, commercial, management sciences</div>
//           <div className="Courses10 left-[109px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//         </div>
//         <div className="Group w-14 h-10 left-[124px] top-[17px] absolute">
//         </div>
//       </div>
//       <div className="Group19 w-72 h-44 left-[326px] top-[210px] absolute">
//         <div className="Rectangle9 w-72 h-44 left-0 top-0 absolute bg-sky-700 rounded-3xl shadow" />
//         <div className="ExactSciences w-72 h-7 left-0 top-[75px] absolute text-center text-white text-3xl font-semibold font-['Onest'] leading-loose">Exact Sciences</div>
//         <div className="Courses10 left-[109px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//       </div>
//       <div className="Group20 w-96 h-44 left-[652px] top-[210px] absolute">
//         <div className="Rectangle9 w-72 h-44 left-0 top-0 absolute bg-lime-700 rounded-3xl shadow" />
//         <div className="Rectangle10 w-72 h-44 left-[326px] top-0 absolute bg-blue-950 rounded-3xl shadow" />
//         <div className="NatureAndLifeSciences w-72 h-16 left-0 top-[69px] absolute text-center text-white text-3xl font-semibold font-['Onest'] leading-loose">Nature and life<br/>Sciences</div>
//         <div className="Technology w-72 h-16 left-[326px] top-[74px] absolute text-center text-white text-3xl font-semibold font-['Onest'] leading-loose">Technology</div>
//         <div className="Courses10 left-[109px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//         <div className="Courses10 left-[435px] top-[135px] absolute text-center text-white text-base font-normal font-['Onest'] leading-none">courses:10</div>
//       </div>
//       <div className="SettingsSvgrepoCom11 w-12 h-12 left-[1102px] top-[223px] absolute" />
//       <div className="MathFormulaSvgrepoCom1 w-11 h-11 left-[451px] top-[226px] absolute" />
//       <div className="NatureConservationSvgrepoCom1 w-20 h-20 left-[761px] top-[208px] absolute" />
//     </div>
//     <div className="Group4 w-20 h-6 left-[539px] top-[4290px] absolute">
//       <div className="Rectangle8 w-20 h-6 left-0 top-0 absolute bg-stone-400/opacity-60 rounded-md" />
//       <div className="Psychology w-16 left-[5px] top-[6px] absolute text-orange-400 text-xs font-medium font-['Onest'] leading-3">Psychology</div>
//     </div>
//     <div className="Group26 w-80 h-60 left-[717px] top-[5549px] absolute">
//       <div className="Rectangle12 w-80 h-60 left-0 top-0 absolute bg-white rounded-3xl" />
//       <div className="Group25 w-72 h-48 left-[24px] top-[18px] absolute">
//         <div className="IHadAlwaysStruggledWithStayingMotivatedAndEngagedInTraditionalClassroomSettingsAndWhenITransitionedToAnELearningPlatformThoseChallengesOnlySeemedToIntensifyProcrastinationFearOfFailureAndAGeneralLackOfDirectionWereConstantObstaclesThatHinderedMyAcademicProgress w-72 left-[5px] top-[36px] absolute text-stone-400 text-base font-medium font-['Onest'] leading-none">"I had always struggled with staying motivated and engaged in traditional classroom settings, and when I transitioned to an e-learning platform, those challenges only seemed to intensify. Procrastination, fear of failure, and a general lack of direction were constant obstacles that hindered my academic progress.”</div>
//         <div className="KarimBenlakhder left-[31px] top-[5px] absolute text-stone-950 text-base font-medium font-['Onest'] leading-none">Karim benlakhder</div>
//         <img className="Ellipse4 w-6 h-6 left-0 top-0 absolute rounded-full" src="https://via.placeholder.com/25x25" />
//       </div>
//     </div>
//     <div className="Group27 w-80 h-60 left-[1082px] top-[5549px] absolute">
//       <div className="Rectangle12 w-80 h-60 left-0 top-0 absolute bg-white rounded-tl-3xl rounded-bl-3xl" />
//       <div className="Group25 w-72 h-40 left-[24.88px] top-[18px] absolute">
//         <div className="TransitioningToOnlineLearningWasASignificantChallengeForMeIOftenFoundMyselfProcrastinatingStrugglingToStayMotivatedAndFeelingOverwhelmedByTheNewFormatMyGradesWereSlippingAndIWasWorriedAboutFallingBehind w-72 left-[4.12px] top-[53px] absolute text-stone-400 text-base font-medium font-['Onest'] leading-none">"Transitioning to online learning was a significant challenge for me. I often found myself procrastinating, struggling to stay motivated, and feeling overwhelmed by the new format. My grades were slipping, and I was worried about falling behind.</div>
//         <div className="OussamaFoughal w-32 left-[32.12px] top-[5px] absolute text-stone-950 text-base font-medium font-['Onest'] leading-none">Oussama foughal</div>
//         <img className="Ellipse4 w-6 h-6 left-0 top-0 absolute rounded-full" src="https://via.placeholder.com/26x25" />
//       </div>
//     </div>
//     <div className="Rectangle13 w-96 h-14 left-[911px] top-[6502px] absolute bg-zinc-100 rounded-2xl" />
//     <div className="EmailAddress left-[937px] top-[6521px] absolute text-black/opacity-50 text-lg font-medium font-['Onest'] leading-tight">Email address</div>
//     <div className="Rectangle14 w-96 h-14 left-[911px] top-[6570px] absolute bg-zinc-100 rounded-2xl" />
//     <div className="WhatKindOfCourseYouWantNext left-[937px] top-[6589px] absolute text-black/opacity-50 text-lg font-medium font-['Onest'] leading-tight">what kind of course you want next?</div>
//     <div className="IHaveReadAndAgreeToTermAsdPrivacy left-[948px] top-[6641px] absolute text-black/opacity-40 text-base font-medium font-['Onest'] leading-none">i have read and agree to term asd privacy</div>
//     <div className="Ellipse5 w-4 h-4 left-[923px] top-[6642px] absolute rounded-full border border-black/opacity-25" />
//     <div className="Rectangle15 w-96 h-11 left-[922px] top-[6682px] absolute bg-amber-400 rounded-3xl" />
//     <div className="RequestAndStartLearning left-[1002px] top-[6695px] absolute text-stone-950 text-base font-medium font-['Onest'] leading-none">Request and start learning</div>
//     <div className="LazregMohamed left-[1183px] top-[7092px] absolute text-black text-2xl font-medium font-['Poppins']">Lazreg Mohamed</div>
//     <div className="OmarBendahane left-[1183px] top-[7128px] absolute text-black text-2xl font-medium font-['Poppins']">Omar bendahane</div>
//     <div className="HttpsWwwUnivBecharDz left-[100px] top-[7098px] absolute text-black text-lg font-normal font-['Poppins'] underline">https://www.univ-bechar.dz</div>
//     <div className="StayInTouch left-[64px] top-[7036px] absolute text-stone-950 text-3xl font-semibold font-['Poppins']">Stay in Touch</div>
//     <div className="Developers left-[1184px] top-[7036px] absolute text-stone-950 text-3xl font-semibold font-['Poppins']">Developers</div>
//     <div className="TahriMohamedUniversityELearningPlatform left-[317px] top-[6908px] absolute text-stone-950 text-4xl font-semibold font-['Poppins']">Tahri Mohamed University E-learning platform  </div>
//     <img className="Logo2 w-20 h-16 left-[226px] top-[6900px] absolute" src="https://via.placeholder.com/75x62" />
//     <img className="Dddd1 w-16 h-16 left-[1151px] top-[6900px] absolute" src="https://via.placeholder.com/65x68" />
//     <div className="LinkCircle w-6 h-6 left-[64px] top-[7101px] absolute">
//     </div>
//     <div className="VuesaxOutlineMobile w-6 h-6 left-[64px] top-[7142px] absolute justify-center items-center inline-flex">
//       <div className="Mobile w-6 h-6 relative">
//       </div>
//     </div>
//     <div className="213049238984 left-[107px] top-[7142px] absolute text-black text-lg font-normal font-['Poppins'] underline">(+213) 049 23 89 84</div>
//     <div className="VuesaxOutlineSms w-6 h-6 left-[66px] top-[7183px] absolute justify-center items-center inline-flex">
//       <div className="Sms w-6 h-6 relative">
//       </div>
//     </div>
//     <div className="CsrmkbaUnivBecharDz left-[107px] top-[7180px] absolute text-black text-lg font-normal font-['Poppins'] underline">csrmkba@univ-bechar.dz</div>
//   </div>
<></>
);

export default LandingPage;