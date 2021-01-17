import React from "react";
import { Left, Fill, CenterType } from "react-spaces";
import Cell from "./Cell";
import { Divider } from 'antd';

export default function FirstCol(props) {
  return (
      <Fill onClick={props.onClick}>
        <Left size="40px" className="addColumn" centerContent={CenterType.HorizontalVertical}>
            <span style={{fontFamily: "arial"}}>+</span>
            <div/>
        </Left>
        <Fill></Fill>
    </Fill>
  );
}
