import React from 'react';

const Header = ({ route, title }) => (
  <div className=" mb-10">
    {/* <p className=" text-sm pb-2 text-gray-400">{route}</p> */}
    <h1 className="main-title pl-1 text-6xl my-12 mt-2 font-semibold  dark:text-gray-200 text-black dark:text-white">
      {title}
    </h1>
  </div>
);

export default Header;
