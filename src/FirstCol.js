import React from "react";
import { Fill, Left, Right } from "react-spaces";
import Cell from "./Cell";

export default function FirstCol() {
  return (
    <Left size={"120px"}>
      <Fill>
        <Cell/>
        {[...Array(6).keys()].map((i) => (
          <Cell as='h3'>{i + 1}</Cell>
        ))}
        <Cell>Total</Cell>
        <Cell>Bonus</Cell>
        <Cell>Sous-total</Cell>
        <Cell>Brelan</Cell>
        <Cell>Petite suite</Cell>
        <Cell>Grande suite</Cell>
        <Cell>Full</Cell>
        <Cell>Carré</Cell>
        <Cell>Yams</Cell>
        <Cell>Chance</Cell>
        <Cell>Sous-total</Cell>
        <Cell>Total</Cell>
        <Cell/>
      </Fill>
      <Right size={3} style={{
        borderRight: '1px solid #FF000050',
        borderLeft: '1px solid #FF000050'
      }}/>
    </Left>
  );
}
