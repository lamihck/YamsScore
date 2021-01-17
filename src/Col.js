import React, {useState, useEffect} from "react";
import { Left } from "react-spaces";
import Canvas from "./Canvas";
import Cell from "./Cell";
import * as Fa from 'react-icons/fa';

export default function Col(props) {
  const [name, setName] = useState()
  const [numRows, setNumRows] = useState(new Array(6).fill(0))
  const [numRows2, setNumRows2] = useState(new Array(7).fill(0))

  useEffect(() => {
    props.setScore && props.setScore(numRows.reduce((a, b) => a + b, 0) + (numRows.reduce((a, b) => a + b, 0) > 62 ? 35 : 0) + numRows2.reduce((a, b) => a + b, 0))
  }, [numRows, numRows2])

  return (
    <Left size={"70px"}>
      {props.isWinner ? <Fa.FaHeart size={8} color="red" style={{
        marginTop: "-15px",
        marginLeft: "55px"
      }} className="sticky-top"/> : ""}
      <Cell><Canvas free onChange={(n) => {setName(n); props.setName(n)}}/></Cell>
      {[...Array(6).keys()].map((i) => (
        <Cell><Canvas onChange={value => setNumRows(numRows.map((num, i2) => i2 == i ? value : num))}/></Cell>
      ))}
      <Cell as="h3">{numRows.reduce((a, b) => a + b, 0)}</Cell>
      <Cell as="h3">{numRows.reduce((a, b) => a + b, 0) > 62 ? 35 : 0}</Cell>
      <Cell as="h3">{numRows.reduce((a, b) => a + b, 0) + (numRows.reduce((a, b) => a + b, 0) > 62 ? 35 : 0)}</Cell>
      
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
      <Cell as="h3">{numRows2.reduce((a, b) => a + b, 0)}</Cell>
      <Cell as="h3">{numRows.reduce((a, b) => a + b, 0) + (numRows.reduce((a, b) => a + b, 0) > 62 ? 35 : 0) + numRows2.reduce((a, b) => a + b, 0)}</Cell>
    </Left>
  );
}
