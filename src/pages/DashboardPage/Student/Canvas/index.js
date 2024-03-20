import React, { useRef, useState, useEffect } from "react";
import StudentSideBar from "../../../../components/shared/StudentSideBar";

export default function CanvasStudent() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3B3B3B");
  const [size, setSize] = useState("3");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const timeout = useRef(null);
  const [cursor, setCursor] = useState("default");

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");

    // Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // Load from localStorage
    const canvasimg = localStorage.getItem("canvasimg");
    if (canvasimg) {
      const image = new Image();
      image.onload = () => {
        ctx.current.drawImage(image, 0, 0);
        setHistory([canvasimg]);
        setHistoryIndex(0);
      };
      image.src = canvasimg;
    }
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const snapshot = canvas.toDataURL("image/png");
    setHistory([...history.slice(0, historyIndex + 1), snapshot]);
    setHistoryIndex(historyIndex + 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      redrawCanvas(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      redrawCanvas(history[historyIndex + 1]);
    }
  };

  const redrawCanvas = (snapshot) => {
    const canvas = canvasRef.current;
    const image = new Image();
    image.onload = () => {
      ctx.current.clearRect(0, 0, canvas.width, canvas.height);
      ctx.current.drawImage(image, 0, 0);
    };
    image.src = snapshot;
  };

  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = getMousePosition(
      canvasRef.current,
      nativeEvent
    );
    draw({ nativeEvent: { offsetX, offsetY } });
    saveToHistory();
  };

  const finishedPosition = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
    saveToHistory();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;

    const { offsetX, offsetY } = getMousePosition(canvas, nativeEvent);
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg", base64ImageData);
    }, 400);
  };

  const clearCanvas = () => {
    localStorage.removeItem("canvasimg");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
    setHistoryIndex(-1);
  };

  const getPen = () => {
    setCursor("default");
    setColor("#3B3B3B");
  };

  const eraseCanvas = () => {
    setCursor("grab");
    setColor("#FFFFFF");
  };

  const getMousePosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      offsetX: (event.clientX - rect.left) * scaleX,
      offsetY: (event.clientY - rect.top) * scaleY,
    };
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = dataURL;
      downloadLink.download = "canvas_image.png";
      downloadLink.click();
    }
  };

  return (
    <>
      <div className="flex">
        <StudentSideBar />
        <div className="mx-2 rounded-lg h-[90vh] w-full overflow-y-hidden">
          <div className="canvas m-5 bg-white rounded-lg">
            <canvas
              className="w-full h-[75vh] rounded-lg"
              style={{ cursor: cursor }}
              onMouseDown={startPosition}
              onMouseUp={finishedPosition}
              onMouseMove={draw}
              ref={canvasRef}
            />
          </div>
          <div className="flex items-center justify-center full ">
            <div className="bg-gray-700 rounded-lg p-4 text-gray-300 canvas-btn flex gap-8 justify-evenly text-2xl">
              <button onClick={getPen}>
                <p>Draw</p>
              </button>
              <div className="">
                <span>Brush color: </span>
                <input
                  className="w-[5rem] bg-gray-700"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div>
                <span>Brush size: </span>
                <select
                  className="btn-width bg-gray-700"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  {[1, 5, 10, 15, 20, 25, 30].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button onClick={clearCanvas} className="btn-width">
                Clear
              </button>
              <button onClick={undo} className="btn-width">
                Undo
              </button>
              <button onClick={redo} className="btn-width">
                Redo
              </button>
              <button onClick={eraseCanvas} className="btn-width">
                Erase
              </button>
              <button onClick={handleSaveImage} className="btn-width">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
