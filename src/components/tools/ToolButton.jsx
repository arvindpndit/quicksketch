import React from 'react';

const ToolButton = ({ label, tool, setTool, setDraggable, icon }) => {
  return (
    <button
      onClick={() => {
        setTool(label);
        label === 'drag' ? setDraggable(true) : setDraggable(false);
      }}
      className={`p-3 rounded-lg hover:bg-gray-200 hover:cursor-pointer ${
        tool === label ? 'bg-blue-300' : ''
      }`}
    >
      {icon}
    </button>
  );
};

export default ToolButton;

