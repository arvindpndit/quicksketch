import React, { useState } from 'react';
import { Stage, Layer, Line, Rect, Circle, Ellipse } from 'react-konva';
import Header from './Header';

const Canvas = () => {
  const [tool, setTool] = useState('pen'); // pen, rectangle, circle
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [draggable, setDraggable] = useState(false);
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
      setLines((prevLines) => {
        const updatedLines = [...prevLines];
        const lastLine = updatedLines[updatedLines.length - 1];

        if (lastLine) {
          lastLine.points = [...lastLine.points, point.x, point.y];
          updatedLines[updatedLines.length - 1] = lastLine;
        }

        return updatedLines;
      });
    } else {
      let updatedShapes = [...shapes];

      // Remove previous temporary shape
      if (
        updatedShapes.length &&
        updatedShapes[updatedShapes.length - 1].temp
      ) {
        updatedShapes.pop();
      }

      let newShape = null;

      if (tool === 'rectangle') {
        setDraggable(false);

        newShape = {
          type: 'rectangle',
          x: startPos.x,
          y: startPos.y,
          width: point.x - startPos.x,
          height: point.y - startPos.y,
          color,
          temp: true, // Mark it as temporary
        };
      } else if (tool === 'drag') {
        //add the logic to make the object draggable
        setDraggable(true);
      } else if (tool === 'circle') {
        setDraggable(false);
        const radius = Math.sqrt(
          Math.pow(point.x - startPos.x, 2) + Math.pow(point.y - startPos.y, 2),
        );
        newShape = {
          type: 'circle',
          x: startPos.x,
          y: startPos.y,
          radius,
          color,
          temp: true,
        };
      } else if (tool === 'ellipse') {
        setDraggable(false);
        const radiusX = Math.abs(point.x - startPos.x);
        const radiusY = Math.abs(point.y - startPos.y);
        newShape = {
          type: 'ellipse',
          x: startPos.x,
          y: startPos.y,
          radiusX,
          radiusY,
          color,
          temp: true,
        };
      }

      if (newShape) {
        updatedShapes.push(newShape);
        setShapes(updatedShapes);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);

    if (shapes.length && shapes[shapes.length - 1].temp) {
      const finalShape = { ...shapes[shapes.length - 1] };
      delete finalShape.temp; // Remove temp flag
      setShapes([...shapes.slice(0, -1), finalShape]); // Replace the last shape with final one
    }
  };

  const clearCanvas = () => {
    setLines([]);
    setShapes([]);
    setDraggable(false);
  };

  const handleMouseEnter = (e) => {
    const stage = e.target.getStage();
    stage.container().style.cursor = 'grab';
  };

  const handleMouseLeave = (e) => {
    const stage = e.target.getStage();
    stage.container().style.cursor = 'default';
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
              draggable={draggable}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
                  draggable={draggable}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
                  draggable={draggable}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
                  draggable={draggable}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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

