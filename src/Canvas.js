import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import Tesseract from "tesseract.js";

export default function Canvas(props) {
  const [isCalculated, setCalculated] = useState(false);
  const [isDrawing, setDrawing] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  const [text, setText] = useState("");
  const canvasRef = useRef(null);

  const isDrawingRef = useRef(isDrawing);
  isDrawingRef.current = isDrawing;

  let clear = () => {
    canvasRef.current && canvasRef.current.clear();
    setCalculated(false);
  };

  let ocr = () => {
    let canvas = canvasRef.current && canvasRef.current.canvas;
    recognize(canvas.drawing).then(({ data }) => {
      if(!isDrawingRef.current){
        let text = clearText(data.text)
        writeText(text)      
        setCalculated(true);
        setText(text)
        if (props.onChange) {
          props.onChange(toInt(text));
        }
      }
    });
  };

  let recognize = async (image, langs, options) => {
    const worker = Tesseract.createWorker(options);
    await worker.load();
    await worker.loadLanguage(langs);
    await worker.initialize(langs);
    await worker.setParameters({
      tessedit_char_whitelist: props.value 
        ? "VX/\\" 
        : props.free 
          ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
          : "0123456789/\\"
    });
    return worker.recognize(image).finally(async () => {
      await worker.terminate();
    });
  };

  let clearText = (text) => {
    if(props.free) return text
    return text
      .replace("V", props.value)
      .replace("/", 0)
      .replace("\\", 0)
      .replace("X", props.value)
      .trim();
  }
  
  let writeText = (text) => {
    clear();
    let canvas = canvasRef.current.canvas.drawing;
    let ctx = Object.assign(canvas.getContext("2d"), {
      font: "30px sans-serif",
      textBaseline: "middle"
    });
    let txtWidth = ctx.measureText(text).width
    ctx.fillText(text, (canvas.width/2)-(txtWidth/2), canvas.height / 2);
  }

  let toInt = (text) => {
    return isNaN(parseInt(text)) ? 0 : parseInt(text)
  }

  let onChange = () => {
    setDrawing(false)
    clearTimer();
    setTimeoutId(setTimeout(ocr, 400));    
  };

  let clearTimer = () => {
    clearTimeout(timeoutId);
  };

  let onClick = () => {
    if (isCalculated) clear();
    setDrawing(true);
    clearTimer();
  };

  let onMove = () => {
    if (isDrawing) clearTimer();
  };

  return (
    <div style={{height: '100%', width: '100%'}}
      onTouchMove={onMove}
      onMouseMove={onMove}
      onMouseDown={onClick}
      onTouchStart={onClick}
    >
      {!isCalculated ? '' : (
        <h3 className="h-100 d-flex justify-content-center align-items-center d-block">{text}</h3>)}
      <CanvasDraw
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          opacity: isCalculated ? 0 : 1
        }}
        onChange={onChange}
        hideInterface={true}
        immediateLoading={false}
        canvasWidth={'100%'}
        canvasHeight={'100%'}
        lazyRadius={0}
        hideGrid={true}
        brushRadius={2}
      />
      
    </div>
  );
}
