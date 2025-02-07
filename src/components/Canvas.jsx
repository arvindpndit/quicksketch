import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line, Text, Rect, Circle, Ellipse } from 'react-konva';
import Header from './Header';
import Footer from './Footer';

const Canvas = () => {
  const [tool, setTool] = useState('pen'); // pen, rectangle, circle
  const [shapes, setShapes] = useState([]);
  const [lines, setLines] = useState([]);
  const [texts, setTexts] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [draggable, setDraggable] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('#000000');
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const inputRef = useRef(null);
  const [zoom, setZoom] = useState(1); // 1 = 100%
  const [stageOffset, setStageOffset] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  //for undo redo
  const [history, setHistory] = useState([
    { shapes: [], lines: [], texts: [] },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const getScaledPointerPosition = (stage) => {
    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return { x: 0, y: 0 };

    const stageX = stage.x();
    const stageY = stage.y();

    return {
      x: (pointerPos.x - stageX) / zoom,
      y: (pointerPos.y - stageY) / zoom,
    };
  };

  const handleZoom = (direction) => {
    setZoom((prevZoom) => {
      let newZoom = direction === 'in' ? prevZoom * 1.1 : prevZoom / 1.1;
      return Math.min(3, Math.max(0.1, newZoom)); // Limits zoom between 10% and 300%
    });
  };

  const saveToHistory = (newShapes, newLines, newTexts) => {
    // Slice history up to current step to remove any redone states
    const newHistory = history.slice(0, currentStep + 1);
    // Add new state
    newHistory.push({
      shapes: newShapes,
      lines: newLines,
      texts: newTexts,
    });
    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
  };

  const undo = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      const previousState = history[newStep];
      setShapes(previousState.shapes);
      setLines(previousState.lines);
      setTexts(previousState.texts);
      setCurrentStep(newStep);
    }
  };

  const redo = () => {
    if (currentStep < history.length - 1) {
      const newStep = currentStep + 1;
      const nextState = history[newStep];
      setShapes(nextState.shapes);
      setLines(nextState.lines);
      setTexts(nextState.texts);
      setCurrentStep(newStep);
    }
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const stage = e.target.getStage();
    const pos = getScaledPointerPosition(stage);
    setStartPos(pos);

    const event = e.evt;
    const clientX = event.clientX;
    const clientY = event.clientY;
    // Capture both stage and client coordinates
    setCursorPosition({
      x: clientX,
      y: clientY,
    });

    if (tool === 'pen') {
      setLines([...lines, { points: [pos.x, pos.y], color }]);
    } else if (tool === 'text') {
      setDraggable(false);
      setInputPosition({ x: pos.x, y: pos.y });
      setInputValue('');
      setInputVisible(true);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue.trim() !== '') {
      setTexts([
        ...texts,
        { x: inputPosition.x, y: inputPosition.y, text: inputValue, color },
      ]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInputConfirm();
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = getScaledPointerPosition(stage);

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
    if (tool == 'pen') {
      saveToHistory(shapes, lines, texts);
    } else if (shapes.length && shapes[shapes.length - 1].temp) {
      const finalShape = { ...shapes[shapes.length - 1] };
      delete finalShape.temp; // Remove temp flag
      const newShapes = [...shapes.slice(0, -1), finalShape];
      setShapes(newShapes);
      saveToHistory(newShapes, lines, texts); // Replace the last shape with final one
    }
  };
  //keyboard shortcut for undo redo
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, history]);

  const clearCanvas = () => {
    setLines([]);
    setShapes([]);
    setTexts([]);
    setDraggable(false);
  };

  const handleMouseEnter = (e) => {
    if (draggable) {
      const stage = e.target.getStage();
      stage.container().style.cursor = 'grab';
    }
  };

  const handleMouseLeave = (e) => {
    const stage = e.target.getStage();
    stage.container().style.cursor = 'default';
  };

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <Header
        tool={tool}
        color={color}
        setTool={setTool}
        clearCanvas={clearCanvas}
        setColor={setColor}
        setDraggable={setDraggable}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight} // Adjust for footer height
        scaleX={zoom}
        scaleY={zoom}
        offsetX={stageOffset.x}
        offsetY={stageOffset.y}
        draggable={draggable}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onMouseLeave={handleMouseUp}
        //className="border border-gray-300 bg-white rounded overflow-hidden"
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={4 / zoom} // Adjust line thickness on zoom
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
                  strokeWidth={3 / zoom}
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
                  strokeWidth={3 / zoom}
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
                  strokeWidth={3 / zoom}
                  draggable={draggable}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              );
            }
            return null;
          })}

          {texts.map((text, i) => (
            <Text
              key={i}
              x={text.x}
              y={text.y}
              text={text.text}
              fontSize={29 / zoom}
              fontFamily="Fredoka"
              fill={text.color}
              draggable={draggable}
            />
          ))}
        </Layer>
      </Stage>
      {inputVisible && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onKeyDown={handleKeyDown}
          className="absolute px-2 py-1 text-2xl text-black"
          style={{
            top: cursorPosition.y,
            left: cursorPosition.x,
            position: 'fixed',
            zIndex: 10,
            background: 'white',
            outline: 'none',
          }}
        />
      )}

      <Footer
        undo={undo}
        redo={redo}
        canUndo={currentStep > 0}
        canRedo={currentStep < history.length - 1}
        handleZoom={handleZoom}
        zoom={zoom}
      />
    </div>
  );
};

export default Canvas;

