import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import Tools from './tools/Tools';

const Header = ({
  tool,
  color,
  clearCanvas,
  setTool,
  setColor,
  setDraggable,
}) => {
  return (
    <div className="flex justify-center fixed z-50 m-5 bg-white">
      <div className="flex gap-2 mb-4 border-gray-200 border  rounded-xl shadow-sm p-2">
        <Tools tool={tool} setTool={setTool} setDraggable={setDraggable} />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 rounded-3xl"
        />
        <button
          onClick={clearCanvas}
          className="p-3 hover:bg-red-300 rounded-lg"
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default Header;

