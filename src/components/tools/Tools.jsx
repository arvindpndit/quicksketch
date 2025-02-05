import { RiRectangleLine } from 'react-icons/ri';
import { FaRegCircle } from 'react-icons/fa';
import { LuPencil } from 'react-icons/lu';
import { TbOvalVertical } from 'react-icons/tb';
import { RiDragMove2Fill } from 'react-icons/ri';
import { IoText } from 'react-icons/io5';
import ToolButton from './ToolButton';

const Tools = ({ tool, setTool, setDraggable }) => {
  return (
    <>
      <ToolButton
        label="drag"
        tool={tool}
        setTool={setTool}
        setDraggable={setDraggable}
        icon={<RiDragMove2Fill />}
      />
      <ToolButton
        label="pen"
        tool={tool}
        setTool={setTool}
        setDraggable={setDraggable}
        icon={<LuPencil />}
      />
      <ToolButton
        label="text"
        tool={tool}
        setTool={setTool}
        setDraggable={setDraggable}
        icon={<IoText />}
      />
      <ToolButton
        label="rectangle"
        tool={tool}
        setTool={setTool}
        setDraggable={setDraggable}
        icon={<RiRectangleLine />}
      />
      <ToolButton
        label="circle"
        tool={tool}
        setTool={setTool}
        setDraggable={setDraggable}
        icon={<FaRegCircle />}
      />
      <ToolButton
        label="ellipse"
        tool={tool}
        setTool={setTool}
        setDraggable={setDraggable}
        icon={<TbOvalVertical />}
      />
    </>
  );
};

export default Tools;

