import React, { useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fill, Layer, ViewPort } from "react-spaces";
import Col from "./Col";
import FirstCol from "./FirstCol";
import LastCol from "./LastCol";

export default function App() {
  let [players, setPlayers] = useState(Array(2).fill({name: "", score: 0}));
  return (
    <div className="App" >
      <ViewPort>
        <Layer zIndex={-1}>
          <Fill style={{
            backgroundColor: "#85625a",
            backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
          }}/>
        </Layer>
        <Fill  className="papers">
          <FirstCol />
          {players.map((n, i) => (
            <Col key={i}
              setScore={score => setPlayers(players.map((p, pi) => pi === i ? {...p, score: score} : p))} 
              setName={name => setPlayers(players.map((p, pi) => pi === i ? {...p, name: name} : p))}
              isWinner={players[i].score === Math.max(...players.map(p => p.score))}
            />
          ))}
          <LastCol onClick={() => setPlayers([...players, {name: "", score: 0}])}/>
        </Fill>
      </ViewPort>
    </div>
  );
}
