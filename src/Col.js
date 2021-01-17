import React, {useState} from "react";
import { Left } from "react-spaces";
import Canvas from "./Canvas";
import Cell from "./Cell";

export default function Col() {
  const [numRows, setNumRows] = useState(new Array(6).fill(0))
  const [numRows2, setNumRows2] = useState(new Array(7).fill(0))

  return (
    <Left size={"60px"}>
      {[...Array(6).keys()].map((i) => (
        <Cell><Canvas onChange={value => setNumRows(numRows.map((num, i2) => i2 == i ? value : num))}/></Cell>
      ))}
      <Cell>{numRows.reduce((a, b) => a + b, 0)}</Cell>
      <Cell>{numRows.reduce((a, b) => a + b, 0) > 62 ? 35 : 0}</Cell>
      <Cell>{numRows.reduce((a, b) => a + b, 0) + (numRows.reduce((a, b) => a + b, 0) > 62 ? 35 : 0)}</Cell>
      
      {[...Array(7).keys()].map((i) => (
        <Cell><Canvas onChange={value => setNumRows2(numRows2.map((num, i2) => i2 == i ? value : num))}
        value={(() => {
          switch (i) {
            case 0: return undefined
            case 1: return 30
            case 2: return 40
            case 3: return 25
            case 4: return undefined
            case 5: return 50
            case 6: return undefined
          }
        })()}/></Cell>
      ))}
      <Cell>{numRows2.reduce((a, b) => a + b, 0)}</Cell>
      <Cell>{numRows.reduce((a, b) => a + b, 0) + (numRows.reduce((a, b) => a + b, 0) > 62 ? 35 : 0) + numRows2.reduce((a, b) => a + b, 0)}</Cell>
    </Left>
  );
}
