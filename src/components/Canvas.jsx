import React, { useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Ellipse } from 'react-konva';
import Header from './Header';

const Canvas = () => {
  const [tool, setTool] = useState('pen'); // pen, rectangle, circle
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('#000000');

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setStartPos(pos);

    if (tool === 'pen') {
      setLines([...lines, { points: [pos.x, pos.y], color }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    if (tool === 'pen') {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines([...lines]);
    } else {
      // For shapes, we'll update the temporary preview
      const shapes_copy = [...shapes];
      console.log('shapes copy', shapes_copy);

      if (shapes_copy.length && isDrawing) {
        shapes_copy.pop(); // Remove the previous preview
      }

      // Add new preview shape
      if (tool === 'rectangle') {
        shapes_copy.push({
          type: 'rectangle',
          x: startPos.x,
          y: startPos.y,
          width: point.x - startPos.x,
          height: point.y - startPos.y,
          color,
        });
      } else if (tool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(point.x - startPos.x, 2) + Math.pow(point.y - startPos.y, 2),
        );
        shapes_copy.push({
          type: 'circle',
          x: startPos.x,
          y: startPos.y,
          radius,
          color,
        });
      } else if (tool === 'ellipse') {
        const radiusX = Math.sqrt(Math.pow(point.x - startPos.x, 2));
        const radiusY = Math.sqrt(Math.pow(point.y - startPos.y, 2));
        shapes_copy.push({
          type: 'ellipse',
          x: startPos.x,
          y: startPos.y,
          radiusX,
          radiusY,
          color,
        });
      }
      setShapes(shapes_copy);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setLines([]);
    setShapes([]);
  };

  return (
    <div className="flex flex-col items-center ">
      <Header
        tool={tool}
        color={color}
        setTool={setTool}
        clearCanvas={clearCanvas}
        setColor={setColor}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="border border-gray-300 bg-white rounded"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={8}
              tension={0.1}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation="source-over"
            />
          ))}
          {shapes.map((shape, i) => {
            if (shape.type === 'rectangle') {
              return (
                <Rect
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={shape.color}
                  strokeWidth={2}
                />
              );
            } else if (shape.type === 'circle') {
              return (
                <Circle
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  stroke={shape.color}
                  strokeWidth={2}
                />
              );
            } else if (shape.type === 'ellipse') {
              return (
                <Ellipse
                  key={i}
                  x={shape.x}
                  y={shape.y}
                  radiusX={shape.radiusX}
                  radiusY={shape.radiusY}
                  stroke={shape.color}
                  strokeWidth={2}
                />
              );
            }
            return null;
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;

