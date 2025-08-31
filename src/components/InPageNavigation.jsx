import { useEffect, useRef, useState } from "react";

const InPageNavigation = ({routes,defaultHidden,defaultActive=0,children}) => {
    let [inPageIndex,setInPageIndex]=useState(null)
    let activeTabLineRef =useRef()
    let activeTabRef= useRef()
    let [isResizeEventAdded,setIsReviseEventAdded]=useState(false)
    let [width,setWidth]=useState(window.innerWidth)
    const changePageState = (btn,i) =>{
        let { offsetWidth , offsetLeft} = btn
        activeTabLineRef.current.style.width=offsetWidth+"px"
        activeTabLineRef.current.style.left=offsetLeft+"px"
        setInPageIndex(i)
    }
    useEffect(()=>{
        if (width>766&&inPageIndex!==defaultActive) {
            
            changePageState(activeTabRef.current , defaultActive)
        }
        if (!isResizeEventAdded) {
            window.addEventListener("resize",()=>{
                if (!isResizeEventAdded) {
                    setIsReviseEventAdded(true)
                }
                setWidth(window.innerWidth)
            })
        }
    },[width])
    console.log(width)
    return ( 
    <>
    <div className="relative rounded-xl mb-8 bg-white dark:bg-main-dark border-b border-light-gray dark:border-dark-gray flex flex-wrap overflow-x-auto">
       { routes.map((route,i) => {
            return (
                <button ref={i == defaultActive ? activeTabRef : null}key={i} className={"p-4 text-sm px-5 capitalize "+(inPageIndex==i? "text-black dark:text-white ":"text-gray-400 dark:text-gray-400 ")} onClick={(e)=>{changePageState(e.target,i)}}>
                    {route}
                </button>
            )
        })}
        <hr ref={activeTabLineRef} className="absolute bottom-0 duration-300 border border-dark-gray dark:border-light-gray"/>
    </div>
    {Array.isArray(children)?children[inPageIndex]:children}
    </>
    );
}
 
export default InPageNavigation;