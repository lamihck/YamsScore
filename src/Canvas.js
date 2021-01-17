import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import Tesseract from "tesseract.js";

export default function Canvas(props) {
  const [isCalculated, setCalculated] = useState(false);
  const [isDrawing, setDrawing] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  const canvasRef = useRef(null);

  let clear = () => {
    canvasRef.current && canvasRef.current.clear();
    setCalculated(false);
  };
  let ocr = () => {
    let canvas = canvasRef.current && canvasRef.current.canvas;
    recognize(canvas.drawing).then(({ data }) => {
      clear();
      let text = clearText(data.text)
      writeText(text)      
      setCalculated(true);
      if (props.onChange) {
        props.onChange(toInt(text));
      }
    });
  };
  let recognize = async (image, langs, options) => {
    const worker = Tesseract.createWorker(options);
    await worker.load();
    await worker.loadLanguage(langs);
    await worker.initialize(langs);
    await worker.setParameters({
      tessedit_char_whitelist: props.value ? "VX/\\" : "0123456789/\\"
    });
    return worker.recognize(image).finally(async () => {
      await worker.terminate();
    });
  };

  let clearText = (text) => {
    return text
      .replace("V", props.value)
      .replace("/", 0)
      .replace("\\", 0)
      .replace("X", props.value)
      .trim();
  }
  
  let writeText = (text) => {
    let canvas = canvasRef.current.canvas.drawing;
    let ctx = Object.assign(canvas.getContext("2d"), {
      font: "30px sans-serif",
      textBaseline: "middle"
    });
    let txtWidth = ctx.measureText(text).width
    ctx.fillText(text, (canvas.width/2)-(txtWidth/2), canvas.height/2);
  }

  let toInt = (text) => {
    return isNaN(parseInt(text)) ? 0 : parseInt(text)
  }

  let onChange = () => {
    setDrawing(false)
    clearTimer();
    setTimeoutId(setTimeout(ocr, 600));
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
      <CanvasDraw
        ref={canvasRef}
        onChange={onChange}
        immediateLoading={false}
        hideInterface={true}
        canvasWidth={'100%'}
        canvasHeight={'100%'}
        lazyRadius={0}
        hideGrid={true}
        brushRadius={2}
      />
    </div>
  );
}
