import React from "react";
import { Left } from "react-spaces";
import Cell from "./Cell";

export default function FirstCol() {
  return (
    <Left size={"120px"}>
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
    </Left>
  );
}
