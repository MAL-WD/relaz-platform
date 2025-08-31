import React from 'react';

import { Button } from '.';
// import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import AnimationWrapper from './AnimationWrapper';
import { Link } from 'react-router-dom';
import write from '../data/write.svg'
import profile from '../data/profile.svg'
import todo from '../data/todo.svg'
import chat from '../data/chat.svg'
import settings from '../data/settings.svg'
import { removeSession } from './sessions';

const UserProfile = () => {
  const { currentColor ,userAuth,setUserAuth,setIsClicked,initialState} = useStateContext();
  const signOutUser = ()=>{
    removeSession("user")
    setUserAuth({access_token:null})
    setIsClicked(initialState)
  }
 
  return (
    <AnimationWrapper transition={{duration:0.2 }}>

    <div style={{transition:0.5}} className=" nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-6 rounded-lg w-96" onBlur={()=>setIsClicked(initialState)}>
      {/* <div className="flex justify-between items-center">
        <p className="font-semibold text-xl text-black dark:text-white dark:text-gray-200 text-black dark:text-white">User Profile</p>
        <Link to='/editor' className='flex gap-2 link  pl-8 py-4'>
        <img src={write} className='w-6 h-6' alt="" />

          <p className='text-dark-gray '>Write</p>
        </Link>
       
      </div> */}
      <div className="flex gap-5 items-center  border-light-gray dark:border-dark-gray border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={userAuth.profile_img}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200 text-black dark:text-white"> {userAuth.username} </p>
          <p className="text-grey text-sm dark:text-gray-400">  Administrator   </p>
          <p className="text-grey text-sm font-semibold dark:text-gray-400"> {userAuth.username} </p>
        </div>
      </div>
      <div>
        <Link to={`/editor`}>

          <div  className="flex gap-4 items-center pt-4 p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button
                  type="button"
                
                  className=" text-xl rounded-lg  hover:bg-light-gray text-dark-gray"
                  >
                  <img src={write} className='w-4 h-4' alt="" />

                </button>

                <div>
                  <p className=" dark:text-gray-200 text-black dark:text-white text-grey  ">Write</p>
                </div>
          </div>
          </Link>
        <Link to={`/user/${userAuth.username}`}>

          <div  className="flex gap-4 items-center  p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button
                  type="button"
                
                  className=" text-xl rounded-lg  hover:bg-light-gray text-dark-gray"
                  >
                  <img src={profile} className='w-4 h-4' alt="" />

                </button>

                <div>
                  <p className=" dark:text-gray-200 text-black dark:text-white text-grey  ">Profile</p>
                </div>
          </div>
          </Link>
        <Link to={`/To-Do-List`}>

          <div  className="flex gap-4 items-center  p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button
                  type="button"
                
                  className=" text-xl rounded-lg  hover:bg-light-gray text-dark-gray"
                  >
                  <img src={todo} className='w-4 h-4' alt="" />

                </button>

                <div>
                  <p className=" dark:text-gray-200 text-black dark:text-white text-grey  ">My Tasks</p>
                </div>
          </div>
          </Link>
        <Link to={`/Chat`}>

          <div  className="flex gap-4 items-center  p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button
                  type="button"
                
                  className=" text-xl rounded-lg  hover:bg-light-gray text-dark-gray"
                  >
                  <img src={chat} className='w-4 h-4' alt="" />

                </button>

                <div>
                  <p className=" dark:text-gray-200 text-black dark:text-white text-grey  ">My Chat</p>
                </div>
          </div>
          </Link>
        <Link to={`/settings/Edit-profile`}>

          <div  className="flex gap-4 pb-4 items-center border-b-1 border-light-gray dark:border-dark-gray p-3 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
                <button
                  type="button"
                
                  className=" text-xl rounded-lg  hover:bg-light-gray text-dark-gray"
                  >
                  <img src={settings} className='w-4 h-4' alt="" />

                </button>

                <div>
                  <p className=" dark:text-gray-200 text-black dark:text-white text-grey  ">Settings</p>
                </div>
          </div>
          </Link>
        {/* {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-5 border-b-1 border-light-gray dark:border-dark-gray p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
              >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 text-black dark:text-white ">{item.title}</p>
              <p className="text-grey text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))} */}
      </div>
      <div className="mt-5">
        <Button
          color="white"
          bgColor={currentColor}
          text="Sign out"
          click={signOutUser}
          borderRadius="14px"
          width="full"
        />
      </div>
    </div>
          </AnimationWrapper>

  );
};

export default UserProfile;
