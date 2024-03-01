import React, { useRef, useState, useEffect } from "react";
import TeacherSideBar from "../../../../components/shared/TeacherSideBar";

export default function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3B3B3B");
  const [size, setSize] = useState("3");
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
      var image = new Image();
      ctx.current = canvas.getContext("2d");
      image.onload = function () {
        ctx.current.drawImage(image, 0, 0);
        setIsDrawing(false);
      };
      image.src = canvasimg;
    }
  }, []);

  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = getMousePosition(
      canvasRef.current,
      nativeEvent
    );
    draw({ nativeEvent: { offsetX, offsetY } });
  };

  const finishedPosition = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
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

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var base64ImageData = canvas.toDataURL("image/png");
      localStorage.setItem("canvasimg", base64ImageData);
    }, 400);
  };

  const getPen = () => {
    setCursor("default");
    // setSize("3");
    setColor("#3B3B3B");
  };

  const eraseCanvas = () => {
    setCursor("grab");
    // setSize("20");
    setColor("#FFFFFF");
  };

  // Function to get mouse position relative to canvas
  const getMousePosition = (canvas, event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      offsetX: (event.clientX - rect.left) * scaleX,
      offsetY: (event.clientY - rect.top) * scaleY,
    };
  };

  return (
    <>
      <div className="flex">
        <TeacherSideBar />
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
              <div className="btn-width color">
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
                  <option>1</option>
                  <option>3</option>
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                </select>
              </div>
              <button onClick={clearCanvas} className="btn-width">
                Clear
              </button>
              <div>
                <button onClick={eraseCanvas} className="btn-width">
                  Erase
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
