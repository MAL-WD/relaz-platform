import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import {}
import avatar from '../data/avatar.jpg';
import Search from '../data/search.svg'
import write from '../data/write.svg'
import menu from '../data/menu.svg';
import chat from '../data/chat.svg';
import notification from '../data/notification.svg';
import { Notification,Chat,UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import SearchSvg from '../components svgs/SearchSvg';
import CloseSvg from '../components svgs/CloseSvg';
import axios from 'axios';
import NotificationSvg from '../components svgs/NotificationSvg';
import MenuSvg from '../components svgs/MenuSvg';
import EditSvg from '../components svgs/EditSvg';
import CourseSvg from '../components svgs/CourseSvg';
const NavButton = ({ title, clickFunc,search,link, icon, color, dotColor }) => {
  
  const {initialState}= useStateContext()
  return (<>
  
    
    <NavLink
      to={link}
      type="button"
      onClick={() => clickFunc()}
      
      
      style={{ color }}
      className="relative text-xl rounded-full  p-3 hover:bg-light-gray dark:hover:bg-secondary-dark"
      >
      <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
      </NavLink>
      </>)
    }

const Navbar = () => {
  const {userAuth:{access_token,isTeacher,new_notification_available},setUserAuth, currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize,userAuth,setIsClicked,initialState } = useStateContext();
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(()=>{
    if (access_token) {
      axios.get(import.meta.env.VITE_SERVER_DOMAIN+"/new-notification",{
        headers:{
          'Authorization':`Bearer ${access_token}`
        }
      })
      .then(({data})=>{
        setUserAuth({...userAuth,...data})
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },[access_token])
  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
let navigate =useNavigate()
  const   handleActiveMenu = () => setActiveMenu(!activeMenu);
  const handleSearch=(e) =>{
    let query=e.target.value
    console.log(e)
    if(e.keyCode == 13 && query.length){
      navigate(`/search/${query}`)
    }

  }
  
  return (
    <div className="flex justify-between py-2 px-4  relative dark:bg-main-dark border-b  dark:border-dark-gray">
      <div className="left-content align-center">
        {/* <button onClick={() => setActiveMenu(!activeMenu)} className='relative text-xl rounded-full p-3 hover:bg-light-gray'><img className='w-6 h-6' src={menu}/></button> */}
        <NavButton title="Menu" clickFunc={handleActiveMenu} color={currentColor} icon={<MenuSvg/>} />
        <div className="search ml-2  md:block">

        <input onKeyDown={handleSearch} type="text" name="" id="" className=' dark:bg-secondary-dark max-sm:hidden p-3 px-9 relative text-sm bg-light-gray dark:text-gray-400  rounded-3xl placeholder:text-sm' placeholder='Search anything here'>
        
        </input>
          <SearchSvg style={"absolute  max-sm:hidden cursor-pointer"}/>
        </div>
        
      </div>
      <div className="flex">
      {!isTeacher?<Link to={`/Courses/CreateCourse`}>

          <div  className="flex gap-4 items-center rounded-full  p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-secondary-dark">              
                  <CourseSvg/>
          </div>
      </Link>:""}
      <Link to={`/editor`}>

          <div  className="flex gap-4 items-center rounded-full  p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-secondary-dark">              
                  <EditSvg/>
          </div>
      </Link>
        {/* <NavButton title="Search" search={true} clickFunc={() => handleClick('cart')} color={currentColor} icon={<img src={Search} className="w-5 h-5 md:hidden" />} /> */}
            {userAuth.access_token?
            <>
            <Link to={`/Notifications`}>

            <div  className="flex gap-4 items-center relative rounded-full  p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-secondary-dark">              
                    <NotificationSvg/>
            </div>
            <span
                  style={{ background: new_notification_available?"#ff4e4e":"" }}
                  className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
                  />
            </Link>
          <div
            className="flex relative items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-light-gray dark:hover:bg-light-gray  "
            onClick={() => handleClick('userProfile')}
            >

              <img src={userAuth.profile_img} className='w-10 h-10 object-cover aspect-square  rounded-full' alt="" />
          </div>
              </>:
              <>
            
            <Link  to="/Sign-in">
              <button className="rounded-full bg-light-gray max-sm:hidden text-sm font-medium py-2 px-4 capitalize hover:bg-opacity-80 flex mx-2 my-1">Sign In</button>
              </Link>
            <Link  to="/Sign-up">
              <button className="rounded-full  bg-main-dark  text-white b text-sm font-medium py-2 px-4 capitalize hover:bg-opacity-80  mx-2 my-1">Sign Up</button>
              </Link>
              </>
            }
                  {/* <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
            {/* <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            /> */}

        {/* {isClicked.cart && (<Cart />)} */}
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;
