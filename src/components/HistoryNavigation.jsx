import React from "react";
import arrow from '../data/left-arrow.svg'
import arrowDark from '../data/left-arrow-dark.svg'
import { useStateContext } from '../contexts/ContextProvider';

 const HistoryNavigation =()=>{
  const { currentMode } = useStateContext();

    const goBack = () => {
        window.history.back();
      };
    
    const goForward = () => {
        window.history.forward();
      };
      return(
        <div className="browsing ">
        <button onClick={goBack}><img className='w-7 h-7 mr-2' src={currentMode? arrow:arrowDark} alt="" /></button>
        <button onClick={goBack}><img className='w-7 h-7 rotate-180' src={arrow} alt="" /></button>
      </div>
      )
}
export default HistoryNavigation;