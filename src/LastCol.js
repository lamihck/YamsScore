import React from "react";
import { Left, Fill, CenterType, Right, Bottom } from "react-spaces";
import Cell from "./Cell";
import { Divider } from 'antd';

export default function FirstCol(props) {
  return (
    <Fill>
      <Fill onClick={props.onClick}>
        <Left size="40px" className="addColumn" centerContent={CenterType.HorizontalVertical}>
            <span style={{fontFamily: "arial"}}>+</span>
            <div/>
        </Left>
        <Fill></Fill>
      </Fill>
      <Right size="80px">
        <Bottom size="80px" style={{
          border: '1px solid #ccc8',
          transform: 'rotate(5deg) translate(15px,15px)',
          background: "linear-gradient(313deg, rgb(255, 255, 255) 27%, rgba(124, 124, 124, 0.184) 59%, rgba(255, 255, 255, 0.604) 54%, rgb(255, 255, 255) 100%)",
          boxShadow: "inset 0 0 15px rgba(0,0,0,0.1), 1px 1px 3px rgba(0,0,0,0.2)",
        }}
        onClick={() => window.location.reload(false)}/>
      </Right>
    </Fill>
  );
}
