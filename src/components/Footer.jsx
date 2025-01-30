import React from 'react';
import { PiGithubLogoDuotone } from 'react-icons/pi';
import { GrUndo, GrRedo } from 'react-icons/gr';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className="flex justify-between p-2">
      <div className="flex gap-5">
        <div className="bg-gray-200 p-2 rounded-lg flex items-center gap-4 hover:cursor-pointer">
          <FaMinus /> 50% <FaPlus />{' '}
        </div>
        <div className="bg-gray-200 p-2 rounded-lg flex  items-center gap-4 hover:cursor-pointer text-xl">
          <GrUndo />
          <GrRedo />
        </div>
      </div>

      <div className="bg-gray-200 hover:cursor-pointer hidden sm:flex gap-1 items-center  p-2 rounded-lg font-sans-serif ">
        <PiGithubLogoDuotone className="text-xl" />
        <span>Created by Arvind</span>
      </div>
    </div>
  );
};

export default Footer;

