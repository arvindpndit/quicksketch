import React from 'react';
import { IoHandRightOutline } from 'react-icons/io5';
import { FaMinus } from 'react-icons/fa6';
import { FiMousePointer } from 'react-icons/fi';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { LuPencil } from 'react-icons/lu';
import { PiTextAa } from 'react-icons/pi';

const Header = () => {
  return (
    <div className="p-3 flex justify-center">
      <div className="border-gray-200 border flex gap-8 text-2xl rounded-lg shadow-sm p-4 bg-white">
        {[
          IoHandRightOutline,
          FiMousePointer,
          MdOutlineCheckBoxOutlineBlank,
          FaMinus,
          LuPencil,
          PiTextAa,
        ].map((Icon, index) => (
          <Icon
            key={index}
            className="rounded-md transition-colors duration-200  hover:text-gray-800"
          />
        ))}
      </div>
    </div>
  );
};

export default Header;

