import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const TrendSvg = ({fill,classes }) => {
  const { currentMode } = useStateContext();

  return (
    <svg className='w-6 h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={currentMode =="Dark"?"#bdbdbd":"#a1a1a1"}>

    <g id="SVGRepo_bgCarrier" stroke-width="0"/>
    
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
    
    <g id="SVGRepo_iconCarrier"> <g opacity="0.4"> <path d="M16.5 9.5L12.3 13.7L10.7 11.3L7.5 14.5" stroke={currentMode =="Dark"?"#bdbdbd":"#a1a1a1"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M14.5 9.5H16.5V11.5" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#555555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> </g>
    
    </svg>
  );
};

export default TrendSvg;
