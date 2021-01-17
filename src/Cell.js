import React from "react";
import { Top, CenterType, Right } from "react-spaces";
export default function Cell(props) {
  return (
    <Top
      size={`${100 / 19}%`}
      centerContent={CenterType.HorizontalVertical}
      style={{ 
        borderRight: "1px dotted rgba(172, 172, 172, 0.3)",
        borderBottom: "1px dotted rgba(172, 172, 172, 0.3)" 
      }}
      trackSize={true}
    >
      {props.children 
        ? props.children.type
          ? props.children 
          : props.as 
            ? <props.as>{props.children}</props.as>
            : <h5 style={{ lineHeight: "16px" }}>{props.children}</h5>
        : ''
      }
    </Top>
  );
}
