import React from 'react';
import { PiGithubLogoDuotone } from 'react-icons/pi';
import { GrUndo, GrRedo } from 'react-icons/gr';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const Footer = ({ undo, redo, canUndo, canRedo, handleZoom, zoom }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 shadow-md p-3 flex justify-between items-center">
      <div className="flex gap-4">
        <div className="bg-gray-200 p-2 rounded-lg flex items-center gap-2 hover:cursor-pointer">
          <FaMinus onClick={() => handleZoom('out')} />
          <span>{Math.round(zoom * 100)}%</span>
          <FaPlus onClick={() => handleZoom('in')} />
        </div>
        <div className="bg-gray-200 p-2 rounded-lg flex items-center gap-6  hover:cursor-pointer text-xl">
          <button
            onClick={undo}
            disabled={!canUndo}
            className=" hover:cursor-pointer"
          >
            <GrUndo />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className=" hover:cursor-pointer"
          >
            <GrRedo />
          </button>
        </div>
      </div>

      <div className="bg-gray-200 hover:cursor-pointer hidden sm:flex gap-2 items-center p-2 rounded-lg font-sans-serif">
        <PiGithubLogoDuotone className="text-xl" />
        <span>Created by Arvind</span>
      </div>
    </div>
  );
};

export default Footer;

