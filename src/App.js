import React, { useState } from "react";
import "./styles.scss";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ViewPort } from "react-spaces";
import Col from "./Col";
import FirstCol from "./FirstCol";
import LastCol from "./LastCol";

export default function App() {
  let [players, setPlayers] = useState(2);
  return (
    <div className="App">
      <ViewPort>
        <FirstCol />
        {[...Array(players)].map(() => <Col/>)}
        <LastCol onClick={() => setPlayers(players+1)}/>
      </ViewPort>
    </div>
  );
}
