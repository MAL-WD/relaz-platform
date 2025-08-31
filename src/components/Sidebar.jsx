import React, { useState ,useEffect} from 'react';
import { Link, NavLink } from 'react-router-dom';


import { links } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import logo from '../data/logo.png';
import close from '../data/close.svg';
import { removeSession } from './sessions';
import CloseSvg from '../components svgs/CloseSvg';

const Sidebar = () => {
  const { currentColor, activeMenu,setIsClicked,setUserAuth,initialState, setActiveMenu, screenSize } = useStateContext();
  const [width,setWidth]=useState(window.innerWidth)
  let [isResizeEventAdded,setIsReviseEventAdded]=useState(false)
  // const { currentColor ,userAuth,setUserAuth,setIsClicked,initialState} = useStateContext();
  const signOutUser = ()=>{
    removeSession("user")
    setUserAuth({access_token:null})
    setIsClicked(initialState)
  }
  console.log(width)
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
    
  };
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    // handleResize()
    if(width<1300){
      setActiveMenu(false);
  
    }else{
      setActiveMenu(true);
    }
    
    if (!isResizeEventAdded) {
      window.addEventListener("resize",()=>{
          if (!isResizeEventAdded) {
              setIsReviseEventAdded(true)
          }
          setWidth(window.innerWidth)
      })
  }
  }, [width]);
  const activeLink = 'flex items-center gap-3 font-semibold p-3.5 rounded-full   text-white  text-md  my-1 m-2';
  const normalLink = 'flex items-center gap-3 font-semibold p-3.5 rounded-full  text-md text-md text-dark-gray dark:text-gray-200 text-black dark:text-white dark:hover:text-gray-300 dark:hover:bg-secondary-dark hover:bg-light-gray my-1 m-2';

  return (
    <div className="ml-3  h-screen  md:overflow-hidden overflow-auto md:hover:overflow-auto  border-r  dark:border-dark-gray" style={{transition:"3s"}}>
      {activeMenu && (
        <>
          <div className="flex justify-between align-center items-center mr-1">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 p-3 flex text-2xl font-[600] tracking-tight dark:text-white text-main-dark">
              <img src={logo} className='w-12 object-contain h-12'/> <span>E-Learning </span>
            </Link>
            <button
            type="button"
            onClick={() =>setActiveMenu(!activeMenu)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className="text-2xl p-3 dark:hover:bg-secondary-dark hover:bg-light-gray"
          >
            {<CloseSvg />}
          </button>
              
            
          </div>
          <div className="flex h-[90%] flex-col justify-between">

          <div className=" ">
            {links.map((item) => (
              <div key={item.title}>
                  <p className="text-gray-400 text-xl dark:text-gray-400 m-1 mt-4 capatalize font-medium">
                    {item.title}
                  </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={ ({ isActive }) => (isActive ? activeLink : normalLink) }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
            <button onClick={signOutUser} className='block w-[90%] rounded-full font-medium  text-lg  mx-auto border p-2' style={{color:currentColor,borderColor:currentColor}}>Log Out</button>
          </div>

        </>
      )}
    </div>
  );
};

export default Sidebar;
