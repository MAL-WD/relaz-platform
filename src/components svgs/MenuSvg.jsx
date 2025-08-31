import React from 'react';

import { useStateContext } from '../contexts/ContextProvider';

const MenuSvg = ({fill ,fillIn="none"}) => {
  const { currentMode } = useStateContext();
  
  
  return (
    <svg className='w-7 h-7' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 6H20M4 12H20M4 18H20" stroke={currentMode =="Dark"?"#bdbdbd":"#a1a1a1"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  );
};

export default MenuSvg;
