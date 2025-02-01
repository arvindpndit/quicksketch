import React from 'react';
import { IoHandRightOutline } from 'react-icons/io5';
import { FaMinus } from 'react-icons/fa6';
import { FiMousePointer } from 'react-icons/fi';
import { RiRectangleLine } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';
import { LuPencil } from 'react-icons/lu';
import { TbOvalVertical } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';
import { PiTextAa } from 'react-icons/pi';

const Header = ({ tool, color, clearCanvas, setTool, setColor }) => {
  return (
    <div className="flex justify-center fixed z-50 m-5">
      <div className="flex gap-2 mb-4 border-gray-200 border  rounded-xl shadow-sm p-2">
        <button
          onClick={() => setTool('pen')}
          className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
            tool === 'pen' ? 'bg-blue-300' : ''
          }`}
        >
          <LuPencil />
        </button>
        <button
          onClick={() => setTool('rectangle')}
          className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
            tool === 'rectangle' ? 'bg-blue-300' : ''
          }`}
        >
          <RiRectangleLine />
        </button>
        <button
          onClick={() => setTool('circle')}
          className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
            tool === 'circle' ? 'bg-blue-300' : ''
          }`}
        >
          <FaRegCircle />
        </button>
        <button
          onClick={() => setTool('ellipse')}
          className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
            tool === 'ellipse' ? 'bg-blue-300' : ''
          }`}
        >
          <TbOvalVertical />
        </button>
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

